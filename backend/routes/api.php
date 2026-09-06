<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\WebsiteController;
use App\Http\Controllers\Api\V1\Website\RoleController;

Route::prefix('v1')->group(function () {
    require __DIR__ . '/auth.php';

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::prefix('user')->group(function () {
            Route::get('/', [UserController::class, 'show']);
            Route::put('/', [UserController::class, 'update']);
        });

        Route::apiResource('websites', WebsiteController::class);
        Route::apiResource('websites/{website}/roles', RoleController::class);
    });
});
