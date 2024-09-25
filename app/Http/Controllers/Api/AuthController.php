<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {

        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {

            return response(['message' => 'Provided Email Or Password Is Incorrect'], 422);
        }

        /** @var User $user */
        $user = Auth::user();

        $token = $user->createToken('main')->plainTextToken;

        $user->status = 1;

        $user->save();

        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {

        $user = $request->user();

        $user->status = 0;

        $user->save();

        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
