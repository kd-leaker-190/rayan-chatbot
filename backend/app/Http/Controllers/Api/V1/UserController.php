<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();
        return ApiResponse::success(
            data: new UserResource($user)
        );
    }

    public function update(UpdateUserRequest $request): JsonResponse
    {
        $user = $request->user();
        $data = $request->validated();

        if ($request->email !== $user->email) {
            $data['email_verified_at'] = null;
        }

        $emailChanged = $request->email !== $user->email;

        $user->update($data);

        if ($emailChanged) {
            $user->sendEmailVerificationNotification();
        }

        return ApiResponse::success(
            data: new UserResource($user->fresh()),
            message: 'اطلاعات شما با موفقیت به روزرسانی شد.'
        );
    }
}
