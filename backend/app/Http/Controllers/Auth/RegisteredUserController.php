<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if ($validator->fails()) {
            return ApiResponse::error(
                errors: $validator->errors(),
                message: 'خطایی در اعتبارسنجی اطلاعات رخ داد، لطفا دوباره امتحان کنید.',
                code: 422
            );
        }

        $data = $validator->validated();
        $user = User::create($data);

        event(new Registered($user));

        Auth::login($user);

        return ApiResponse::success(
            data: new UserResource($user),
            message: __('auth.registered_successfully'),
            code: 201,
        );
    }
}
