<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClassSubjects;
use App\Http\Requests\StoreClassSubjectsRequest;
use App\Http\Requests\UpdateClassSubjectsRequest;
use App\Http\Resources\ClassSubjectResource;

class AssignsubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ClassSubjectResource::collection(
            ClassSubjects::with(['user', 'subject', 'classm'])->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClassSubjectsRequest $request)
    {
        $data = $request->validated();

        $classSubject = ClassSubjects::create($data);

        $classSubject->load(['user', 'subject', 'classm']);

        return response(new ClassSubjectResource($classSubject), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ClassSubjects $classSubject)
    {
        $classSubject->load(['user', 'subject', 'classm']);

        return new ClassSubjectResource($classSubject);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClassSubjectsRequest $request, ClassSubjects $classSubject)
    {
        $data = $request->validated();

        $classSubject->update($data);

        $classSubject->load(['user', 'subject', 'classm']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClassSubjects $classSubject)
    {
        $classSubject->delete();

        return response('', 204);
    }
}
