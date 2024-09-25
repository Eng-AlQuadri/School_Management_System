<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminRequest;
use App\Http\Resources\AdminResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AdminResource::collection(
            Admin::with('user')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdminRequest $request)
    {
        $data = $request->validated();

        // Create the user
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'status' => 0,
            'role' => 'admin'
        ]);

        $admin = Admin::create([
            'user_id' => $user->id,
        ]);

        return response(new AdminResource($admin), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        $admin->load('user'); // Eager load the user relationship

        return new AdminResource($admin);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdminRequest $request, Admin $admin)
    {
        $data = $request->validated();

        $user = User::findOrFail($admin->user_id);

        $user->name = $data['name'];

        $user->email = $data['email'];

        if (isset($data['password'])) {

            $data['password'] = bcrypt($data['password']);

            $user->password = $data['password'];
        }

        $user->save();

        $admin->update();

        return new AdminResource($admin);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        $user = User::findOrFail($admin->user_id);

        $admin->delete();

        $user->delete();

        return response('', 204);
    }
}
