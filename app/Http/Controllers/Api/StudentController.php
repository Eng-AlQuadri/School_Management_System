<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\User;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return StudentResource::collection(
            Student::with(['user', 'classm'])->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'status' => 0,
            'role' => 'student'
        ]);

        $student = Student::create([
            'user_id' => $user->id,
            'class_id' => $data['classmID']
        ]);

        $student->load(['user', 'classm']);

        return response(new StudentResource($student), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        $student->load(['user', 'classm']);

        return new StudentResource($student);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $data = $request->validated();

        $user = User::findOrFail($student->user_id);

        $user->name = $data['name'];

        $user->email = $data['email'];

        if (isset($data['password'])) {

            $data['password'] = bcrypt($data['password']);

            $user->password = $data['password'];
        }

        $user->save();

        $student->class_id = $data['classmID'];

        $student->save();

        $student->update();

        $student->load(['user', 'classm']);

        return new StudentResource($student);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $user = User::findOrFail($student->user_id);

        $student->delete();

        $user->delete();

        return response('', 204);
    }

    public function studentsAtClass($id)
    {

        return StudentResource::collection(
            Student::with(['user', 'classm'])->where('class_id', $id)->get()
        );
    }

    public function getStudentsByTeacher($teacherId)
    {
        $students = Student::join('classms', 'students.class_id', '=', 'classms.id')
            ->join('teacher_classes', 'classms.id', '=', 'teacher_classes.class_id')
            ->join('users', 'students.user_id', '=', 'users.id') // Join with users table
            ->where('teacher_classes.teacher_id', $teacherId)
            ->select(
                'students.*',
                'users.name as user_name',
                'users.email as user_email',
                'users.status as user_status', //
                'classms.name as class_name' // Select classm fields
            ) // Example field
            ->get();

        // SELECT students.*
        // FROM students
        // JOIN classms ON students.class_id = classms.id
        // JOIN teacher_classes ON classms.id = teacher_classes.class_id
        // WHERE teacher_classes.teacher_id = 1;

        return response()->json($students);
    }
}
