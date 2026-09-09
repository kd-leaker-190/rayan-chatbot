<?php

namespace App\Http\Controllers\Api\V1\Website;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Website\Role\StoreRoleRequest;
use App\Http\Requests\Website\Role\UpdateRoleRequest;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use App\Models\Website;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Website $website)
    {
        if ($request->user()->id !== $website->owner_id) {
            return ApiResponse::error(
                message: 'داده موردنظر شما یافت نشد',
                code: 404
            );
        }

        $roles = Role::with(['website', 'permissions', 'operators'])
            ->where('website_id', $website->id)
            ->orWhereNull('website_id')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return ApiResponse::success(
            data: RoleResource::collection($roles)->response()->getData(true),
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request, Website $website)
    {
        if ($request->user()->id !== $website->owner_id) {
            return ApiResponse::error(
                message: 'داده موردنظر شما یافت نشد',
                code: 404
            );
        }

        $data = $request->validated();

        $role = $website->roles()->create($data);
        $role->permissions()->attach($data['permission_ids']);

        $role->load(['website', 'permissions']);

        return ApiResponse::success(
            data: new RoleResource($role),
            message: 'نقش موردنظر شما با موفقیت ایجاد شد.',
            code: 201,
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Website $website, Role $role)
    {
        if ($request->user()->id !== $website->owner_id) {
            return ApiResponse::error(
                message: 'داده موردنظر شما یافت نشد',
                code: 404
            );
        }

        $role->load(['website', 'permissions']);

        return ApiResponse::success(
            data: new RoleResource($role),
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Website $website, Role $role)
    {
        if ($request->user()->id !== $website->owner_id) {
            return ApiResponse::error(
                message: 'داده موردنظر شما یافت نشد',
                code: 404
            );
        }

        if ($role->website_id !== $website->id) {
            return ApiResponse::error(
                message: 'داده موردنظر شما یافت نشد',
                code: 404
            );
        }

        $data = $request->validated();

        $role->update($data);
        $role->permissions()->sync($data['permission_ids']);

        $role->load(['website', 'permissions']);

        return ApiResponse::success(
            data: new RoleResource($role),
            message: 'نقش موردنظر شما با موفقیت ویرایش شد.',
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Website $website, Role $role)
    {
        if ($request->user()->id !== $website->owner_id) {
            return ApiResponse::error(
                message: 'داده موردنظر شما یافت نشد',
                code: 404
            );
        }

        if ($role->website_id !== $website->id) {
            return ApiResponse::error(
                message: 'داده موردنظر شما یافت نشد',
                code: 404
            );
        }

        $role->delete();

        return ApiResponse::success(
            message: 'نقش موردنظر شما با موفقیت حذف شد.'
        );
    }
}
