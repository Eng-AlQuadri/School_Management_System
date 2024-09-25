<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAttendanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'attendance' => 'required|array',  // Ensure 'attendance' is an array
            'attendance.*.date' => 'required|date',  // Validate each item's date
            'attendance.*.status' => 'required|in:present,late,absent',  // Validate each item's status
            'attendance.*.student_id' => 'required|exists:students,id',  // Ensure student_id exists in the students table
            'attendance.*.class_id' => 'required|exists:classms,id',  // Ensure class_id exists in the classes table
        ];
    }
}
