<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();
        return ApiResponse::success(
            data: new UserResource($user)
        );
    }

    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'lowercase', Rule::unique('users', 'email')->ignore($request->user()->id)],
            'password' => ['nullable', 'string', 'min:8', 'confirmed', Rules\Password::defaults()],
        ]);

        if ($validator->fails()) {
            return ApiResponse::error(
                errors: $validator->errors(),
                message: 'خطایی در اعتبارسنجی اطلاعات رخ داد، لطفا دوباره امتحان کنید.',
                code: 422
            );
        }

        $data = $validator->validated();

        if ($request->filled('password')) {
            $data['password'] = $request->password;
        }

        $user->update($data);

        return ApiResponse::success(
            data: new UserResource($user->fresh()),
            message: 'اطلاعات شما با موفقیت به روزرسانی شد.'
        );
    }

    public function checkUserWebsiteStatus(Request $request): JsonResponse
    {
        $user = $request->user();
        if ($user->ownedWebsites()->count() > 0) {
            return ApiResponse::success(
                data: [
                    'has_website' => true
                ]
            );
        }

        return ApiResponse::success(
            data: [
                'has_website' => false
            ]
        );
    }
}
