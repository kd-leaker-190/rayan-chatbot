<?php

namespace App\Http\Controllers\Api\V1\Website;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\RoleOptionResource;
use App\Models\Role;
use App\Models\Website;
use Illuminate\Http\Request;

class RoleOptionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Website $website)
    {
        $this->authorize('viewAny', [Role::class, $website]);

        $roles = Role::query()
            ->where(function ($query) use ($website) {
                $query
                    ->where('website_id', $website->id)
                    ->orWhereNull('website_id');
            })
            ->latest()
            ->get();

        return ApiResponse::success(
            data: RoleOptionResource::collection($roles),
        );
    }
}
