<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;

Route::post("signup", [AuthController::class, "signup"]);
Route::post("login", [AuthController::class, "signin"]);

// Protected routes with sanctum auth
Route::middleware('auth:sanctum')->group(function () {
    Route::get("user", [AuthController::class, "user"]);
    Route::post("logout", [AuthController::class, "logout"]);

    Route::get("project", [ProjectController::class, "index"]);
    Route::post("project", [ProjectController::class, "store"]);
});