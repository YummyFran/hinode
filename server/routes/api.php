<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskListController;
use App\Http\Controllers\CardController;

Route::post("signup", [AuthController::class, "signup"]);
Route::post("login", [AuthController::class, "signin"]);

// Protected routes with sanctum auth
Route::middleware('auth:sanctum')->group(function () {
    Route::get("user", [AuthController::class, "user"]);
    Route::post("logout", [AuthController::class, "logout"]);

    Route::get("project", [ProjectController::class, "index"]);
    Route::post("project", [ProjectController::class, "store"]);
    Route::get("project/{id}", [ProjectController::class, "show"]);

    Route::get("/project/{projectId}/list", [TaskListController::class, "index"]);
    Route::post("/project/{projectId}/list", [TaskListController::class, "store"]);

    Route::get('/list/{listId}/card', [CardController::class, 'index']);
    Route::post('/list/{listId}/card', [CardController::class, 'store']);
});