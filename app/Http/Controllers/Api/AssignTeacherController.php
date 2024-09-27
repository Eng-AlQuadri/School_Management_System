<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeacherClasses;
use App\Http\Requests\StoreTeacherClassesRequest;
use App\Http\Requests\UpdateTeacherClassesRequest;
use App\Http\Resources\ClassTeacherResource;

class AssignTeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ClassTeacherResource::collection(
            TeacherClasses::with(['user', 'teacher', 'classm', 'teacher.user'])->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherClassesRequest $request)
    {
        $data = $request->validated();

        $teacherClassm = TeacherClasses::create($data);

        $teacherClassm->load(['user', 'teacher', 'classm', 'teacher.user']);

        return response(new ClassTeacherResource($teacherClassm), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(TeacherClasses $teacherClassm)
    {

        $teacherClassm = TeacherClasses::find($teacherClassm->id);

        if (!$teacherClassm) {
            return response()->json(['message' => $teacherClassm->id], 404);
        }

        $teacherClassm->load(['user', 'teacher', 'classm', 'teacher.user']);

        return new ClassTeacherResource($teacherClassm);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherClassesRequest $request, TeacherClasses $teacherClassm)
    {
        $data = $request->validated();

        $teacherClassm->update($data);

        $teacherClassm->load(['user', 'teacher', 'classm', 'teacher.user']);

        return new ClassTeacherResource($teacherClassm);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TeacherClasses $teacherClassm)
    {
        $teacherClassm->delete();

        return response('', 204);
    }

    // // Get Classes Based On Teacher ID
    // public function currentClass($id)
    // {
    //     $teacherClassm = TeacherClasses::where('teacher_id', $id)->first();

    //     // Check if the teacher exists
    //     if ($teacherClassm) {

    //         $teacherClassm->load(['user', 'teacher', 'classm', 'teacher.user']);


    //         return new ClassTeacherResource($teacherClassm);
    //     } else {

    //         return null;
    //     }
    // }

    public function currentClass($teacherId)
    {

        $currentClasses = TeacherClasses::join('classms', 'teacher_classes.class_id', '=', 'classms.id')
            ->where('teacher_classes.teacher_id', $teacherId)
            ->select(
                'classms.name as class_name',
                'teacher_classes.class_id as class_id'
            )->get();

        return response()->json(['data' => $currentClasses]);
    }
}
