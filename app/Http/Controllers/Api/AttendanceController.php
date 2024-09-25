<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Http\Requests\StoreAttendanceRequest;
use App\Http\Requests\UpdateAttendanceRequest;
use App\Http\Resources\AttendanceResource;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AttendanceResource::collection(
            Attendance::with(['classm', 'student', 'student.user'])->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttendanceRequest $request)
    {

        $attendanceData = $request->input('attendance');

        foreach ($attendanceData as $data) {
            Attendance::create([
                'student_id' => $data['student_id'],
                'class_id' => $data['class_id'],
                'date' => $data['date'],
                'status' => $data['status']
            ]);
        }

        return response()->json(['message' => 'Attendance recorded successfully!'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttendanceRequest $request, Attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        //
    }

    public function studentsAtClass($id)
    {
        return AttendanceResource::collection(
            Attendance::with(['classm', 'student', 'student.user'])->where('class_id', $id)->get()
        );
    }
}
