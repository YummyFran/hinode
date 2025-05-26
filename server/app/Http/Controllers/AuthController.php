<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
    use HasApiTokens;

    public function signup(Request $request) {
        try {
            $request->validate([
                "name" => "required|string",
                "email" => "required|email|unique:users,email",
                "role" => "required|string|in:admin,user",
                "password" => "required|string"
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
                'password' => bcrypt($request->password)
            ]);

            $token = $user->createToken("auth_token")->plainTextToken;
            $cookie = \cookie('auth_token', $token, 60 * 24 * 7, null, null, false, false, false);

            return response()->json([
                "success" => true,
                "message" => "User registered successfully",
                "access_token" => $token,
                "token_type" => "Bearer",
                "user" => $user
            ])->cookie($cookie);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Signup failed",
                "error" => $e->getMessage()
            ], 500);
        }
    }


    public function signin(Request $request) {
        try {
            $request->validate([
                "email" => "required|email",
                "password" => "required"
            ]);
    
            if (!Auth::attempt($request->only("email", "password"))) {
                return response()->json([
                    "success" => false,
                    "message" => "Invalid credentials"
                ], 401);
            }
    
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;
            $cookie = \cookie('auth_token', $token, 60 * 24 * 7, null, null, false, false, false);
    
            return response()->json([
                "success" => true,
                "message" => "Login successful",
                "access_token" => $token,
                "token_type" => "Bearer",
                "user" => $user
            ])->cookie($cookie);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Signin failed",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function user()
    {
        return response()->json([
            "success" => true,
            "user" => Auth::user()
        ]);
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
    
            return response()->json([
                "success" => true,
                "message" => "Logged out successfully"
            ])->withoutCookie('auth_token');
        } catch(\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Logout failed",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
