<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Classm;
use App\Http\Requests\StoreClassmRequest;
use App\Http\Requests\UpdateClassmRequest;
use App\Http\Resources\ClassmResource;

class ClassmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ClassmResource::collection(
            Classm::all()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClassmRequest $request)
    {
        $data = $request->validated();

        $classm = Classm::create($data);

        return response(new ClassmResource($classm), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Classm $classm)
    {
        return new ClassmResource($classm);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClassmRequest $request, Classm $classm)
    {
        $data = $request->validated();

        $classm->update($data);

        return new ClassmResource($classm);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classm $classm)
    {
        $classm->delete();

        return response('', 204);
    }
}
