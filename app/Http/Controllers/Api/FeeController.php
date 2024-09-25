<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Fee;
use App\Http\Requests\StoreFeeRequest;
use App\Http\Requests\UpdateFeeRequest;
use App\Http\Resources\FeeResource;

class FeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return FeeResource::collection(
            Fee::with(['admin', 'admin.user', 'student', 'student.user'])->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeeRequest $request)
    {
        $data = $request->validated();

        $fee = Fee::create($data);

        $fee->load(['admin', 'admin.user', 'student', 'student.user']);

        return response(new FeeResource($fee), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Fee $fee)
    {
        $fee->load(['admin', 'admin.user', 'student', 'student.user']);

        return new FeeResource($fee);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeeRequest $request, Fee $fee)
    {
        $data = $request->validated();

        $fee->update($data);

        $fee->load(['admin', 'admin.user', 'student', 'student.user']);

        return new FeeResource($fee);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fee $fee)
    {
        $fee->delete();

        return response('', 204);
    }

    public function pendingFees(Fee $fee)
    {
        // $pendingFees = Fee::where('status', 'pending')->get();

        // return FeeResource::collection($pendingFees);

        return FeeResource::collection(
            Fee::with(['student', 'student.user'])->where('status', 'pending')->get()
        );
    }
}
