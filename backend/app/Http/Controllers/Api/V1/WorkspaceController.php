<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\WorkspaceResource;
use App\Models\Workspace;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WorkspaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            return ApiResponse::error(
                errors: $validator->errors(),
                message: 'خطایی در اعتبارسنجی اطلاعات رخ داد، لطفا دوباره امتحان کنید.',
                code: 422
            );
        }

        $workspace = $user->ownedWorkspaces()->create($validator->validated());
        $workspace->load(['owner']);

        return ApiResponse::success(
            data: new WorkspaceResource($workspace),
            message: 'میزکار شما با موفقیت ایجاد شد.',
            code: 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Workspace $workspace): JsonResponse
    {
        $user = $request->user();

        if ($workspace->owner_id !== $user->id) {
            return ApiResponse::error(
                message: 'شما اجازه ویرایش این میزکار را ندارید.',
                code: 403
            );
        }

        $validator = Validator::make($request->all(), [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'bio'  => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            return ApiResponse::error(
                errors: $validator->errors(),
                message: 'خطایی در اعتبارسنجی اطلاعات رخ داد، لطفا دوباره امتحان کنید.',
                code: 422
            );
        }

        $workspace->update($validator->validated());

        return ApiResponse::success(
            data: new WorkspaceResource($workspace),
            message: 'اطلاعات میزکار شما با موفقیت ویرایش شد.',
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workspace $workspace)
    {
        //
    }
}
