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
    public function getUser(Request $request): JsonResponse
    {
        return ApiResponse::success(
            data: new UserResource($request->user())
        );
    }

    public function updateUser(Request $request): JsonResponse
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'username' => ['required', 'string', 'max:255', 'lowercase', Rule::unique('users', 'username')->ignore($request->user()->id)],
            'email' => ['required', 'string', 'email', 'lowercase', Rule::unique('users', 'email')->ignore($request->user()->id)],
            'password' => ['nullable', 'string', 'min:8', 'confirmed', Rules\Password::defaults()],
            'first_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,jpg,png']
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

        if ($request->hasFile('avatar')) {
            if ($user->avatar && Storage::disk('local')->exists($user->avatar)) {
                Storage::disk('local')->delete($user->avatar);
            }

            $data['avatar'] = $request->file('avatar')->store(
                'upload/users/avatars',
                'local'
            );
        }

        $user->update($data);

        return ApiResponse::success(
            data: new UserResource($user->fresh()),
            message: 'اطلاعات شما با موفقیت به روزرسانی شد.'
        );
    }
}
