<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subjects;
use App\Http\Requests\StoreSubjectsRequest;
use App\Http\Requests\UpdateSubjectsRequest;
use App\Http\Resources\SubjectResource;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SubjectResource::collection(
            Subjects::with('user')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubjectsRequest $request)
    {
        $data = $request->validated();

        $subject = Subjects::create([
            'name' => $data['name'],
            'type' => $data['type'],
            'status' => $data['status'],
            'created_by' => $data['created_by']
        ]);

        $subject->load('user');

        return response(new SubjectResource($subject), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subjects $subject)
    {
        $subject->load('user');

        return new SubjectResource($subject);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubjectsRequest $request, Subjects $subject)
    {
        $data = $request->validated();

        $subject->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subjects $subject)
    {
        $subject->delete();

        return response('', 204);
    }
}
