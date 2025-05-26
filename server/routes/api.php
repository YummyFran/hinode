<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post("signup", [AuthController::class, "signup"]);
Route::post("login", [AuthController::class, "signin"]);

// Protected routes with sanctum auth
Route::middleware('auth:sanctum')->group(function () {
    Route::get("user", [AuthController::class, "user"]);
    Route::post("logout", [AuthController::class, "logout"]);

});