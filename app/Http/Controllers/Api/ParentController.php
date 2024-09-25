<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Parents;
use App\Http\Requests\StoreParentsRequest;
use App\Http\Requests\UpdateParentsRequest;
use App\Http\Resources\ParentsResource;
use App\Models\User;

class ParentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ParentsResource::collection(
            Parents::with('user')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreParentsRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'status' => 0,
            'role' => 'parent'
        ]);

        $parent = Parents::create([
            'user_id' => $user->id,
            'contact_number' => $data['contact_number']
        ]);

        $parent->load('user');

        return response(new ParentsResource($parent), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Parents $parent)
    {
        $parent->load('user');

        return new ParentsResource($parent);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateParentsRequest $request, Parents $parent)
    {
        $data = $request->validated();

        $user = User::findOrFail($parent->user_id);

        $user->name = $data['name'];

        $user->email = $data['email'];

        if (isset($data['password'])) {

            $data['password'] = bcrypt($data['password']);

            $user->password = $data['password'];
        }

        $user->save();

        $parent->contact_number = $data['contact_number'];

        $parent->save();

        $parent->update();

        $parent->load('user');

        return new ParentsResource($parent);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Parents $parent)
    {
        $user = User::findOrFail($parent->user_id);

        $parent->delete();

        $user->delete();

        return response('', 204);
    }
}
