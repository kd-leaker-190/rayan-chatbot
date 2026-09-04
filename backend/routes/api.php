<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\WebsiteController;

Route::prefix('v1')->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::prefix('user')->group(function () {
            Route::get('/', [UserController::class, 'show']);
            Route::put('/', [UserController::class, 'update']);

            Route::get('has-website', [UserController::class, 'checkUserWebsiteStatus']);
        });

        Route::apiResource('websites', WebsiteController::class);
    });
});
