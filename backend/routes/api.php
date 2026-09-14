<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\WebsiteController;
use App\Http\Controllers\Api\V1\PermissionController;
use App\Http\Controllers\Api\V1\Website\RoleController;
use App\Http\Controllers\Api\V1\Website\OperatorController;
use App\Http\Controllers\Api\V1\Website\RoleOptionController;
use App\Http\Controllers\Api\V1\Website\OperatorInvitationController;

Route::prefix('v1')->group(function () {
    require __DIR__ . '/auth.php';

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::prefix('user')->group(function () {
            Route::get('/', [UserController::class, 'show']);
            Route::put('/', [UserController::class, 'update']);
        });

        Route::apiResource('websites', WebsiteController::class);

        Route::get('permissions', PermissionController::class);

        Route::get('websites/{website}/roles/options', RoleOptionController::class);
        Route::apiResource('websites/{website}/roles', RoleController::class);

        Route::apiResource('websites/{website}/operators', OperatorController::class)->except(['store']);

        Route::post('websites/{website}/operator-invitations/send', [OperatorInvitationController::class, 'send']);
    });
});
