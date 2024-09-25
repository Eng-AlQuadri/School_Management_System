<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Http\Resources\TeacherResource;
use App\Models\User;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TeacherResource::collection(
            Teacher::with('user')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'status' => 0,
            'role' => 'teacher'
        ]);

        $teacher = Teacher::create([
            'user_id' => $user->id,
            'department' => $data['department']
        ]);

        return response(new TeacherResource($teacher), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        $teacher->load('user');

        return new TeacherResource($teacher);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {
        $data = $request->validated();

        $user = User::findOrFail($teacher->user_id);

        $user->name = $data['name'];

        $user->email = $data['email'];

        if (isset($data['password'])) {

            $data['password'] = bcrypt($data['password']);

            $user->password = $data['password'];
        }

        $user->save();

        $teacher->department = $data['department'];

        $teacher->save();

        $teacher->update();

        return new TeacherResource($teacher);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        $user = User::findOrFail($teacher->user_id);

        $teacher->delete();

        $user->delete();

        return response('', 204);
    }

    // Find Teacher ID Based On User ID
    public function whoIsTeacher($userId)
    {

        $teacher = Teacher::where('user_id', $userId)->first();

        // Check if the teacher exists
        if ($teacher) {

            return response()->json(['data' => $teacher->id]);
        } else {

            return null;
        }
    }
}
