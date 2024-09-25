<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Http\Requests\StoreExamRequest;
use App\Http\Requests\UpdateExamRequest;
use App\Http\Resources\ExamResource;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ExamResource::collection(
            Exam::with(['user', 'subject', 'classm'])->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExamRequest $request)
    {
        $data = $request->validated();

        $exam = Exam::create($data);

        $exam->load(['user', 'subject', 'classm']);

        return response(new ExamResource($exam), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam)
    {
        $exam->load(['user', 'subject', 'classm']);

        return new ExamResource($exam);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExamRequest $request, Exam $exam)
    {
        $data = $request->validated();

        $exam->update($data);

        $exam->load(['user', 'subject', 'classm']);

        return new ExamResource($exam);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        $exam->delete();

        return response('', 204);
    }

    public function getExamsByTeacher($teacherId)
    {
        $exams = Exam::join('classms', 'exams.class_id', '=', 'classms.id')
            ->join('subjects', 'exams.subject_id', '=', 'subjects.id')
            ->join('teacher_classes', 'classms.id', '=', 'teacher_classes.class_id')
            ->join('users', 'exams.created_by', '=', 'users.id')
            ->where('teacher_classes.teacher_id', $teacherId)
            ->select(
                'exams.id as exam_id',
                'subjects.name as subject_name',
                'subjects.status as subject_status',
                'users.name as created_by',
                'classms.name as class_name'
            )->get();

        return response()->json($exams);
    }
}
