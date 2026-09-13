<?php

namespace App\Http\Controllers\Api\V1\Website;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\OperatorResource;
use App\Models\Operator;
use App\Models\Role;
use App\Models\Website;
use App\Policies\OperatorPolicy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Throwable;

class OperatorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Website $website)
    {
        $this->authorize('viewAny', [Operator::class, $website]);

        $query = $website->operators()
            ->with(['role', 'user'])
            ->latest();

        if (!OperatorPolicy::isOwner(auth()->user(), $website)) {
            $query->where('user_id', '!=', $website->owner_id);
        }

        $operators = $query
            ->paginate(10)
            ->withQueryString();

        return ApiResponse::success(
            data: OperatorResource::collection($operators)->response()->getData(true),
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Website $website, Operator $operator)
    {
        $this->authorize('view', [Operator::class, $operator, $website]);

        $operator->load(['role', 'user', 'website']);

        return ApiResponse::success(
            data: new OperatorResource($operator),
        );
    }

    /**
     * Update the specified resource in storage.
     * @throws Throwable
     */
    public function update(Request $request, Website $website, Operator $operator)
    {
        $this->authorize('update', [Operator::class, $operator, $website]);

        $request->validate([
            'status' => ['sometimes', 'in:active,inactive,suspended'],
            'role_id' => ['nullable', 'required', 'exists:roles,id'],
        ]);

        $operator = DB::transaction(function () use ($request, $website, $operator) {
            if ($request->filled('role_id')) {
                $role = Role::owner()->firstOrFail();

                $operator->role()->associate($role);
            }

            $operator->update($request->only(['status']));

            return $operator;
        });

        return ApiResponse::success(
            data: new OperatorResource($operator),
            message: 'وضعیت اوپراتور با موفقیت به روزرسانی شد.',
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Website $website, Operator $operator)
    {
        $this->authorize('delete', [Operator::class, $operator, $website]);

        $operator->delete();

        return ApiResponse::success(
            message: 'اوپراتور با موفقیت حذف شد.',
        );
    }
}
