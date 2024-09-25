<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Homework;
use App\Http\Requests\StoreHomeworkRequest;
use App\Http\Requests\UpdateHomeworkRequest;
use App\Http\Resources\HomeworkResource;

class HomeworkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return HomeworkResource::collection(
            Homework::with(['user', 'subject', 'classm'])->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHomeworkRequest $request)
    {
        $data = $request->validated();

        $homework = Homework::create($data);

        $homework->load(['user', 'subject', 'classm']);

        return response(new HomeworkResource($homework), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Homework $homework)
    {
        $homework->load(['user', 'subject', 'classm']);

        return new HomeworkResource($homework);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHomeworkRequest $request, Homework $homework)
    {
        $data = $request->validated();

        $homework->update($data);

        $homework->load(['user', 'subject', 'classm']);

        return new HomeworkResource($homework);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Homework $homework)
    {
        $homework->delete();

        return response('', 204);
    }
}
