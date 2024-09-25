<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'date' => $this->date,
            'status' => $this->status,
            'classm' => new ClassmResource($this->whenLoaded('classm')),
            'student' => new StudentResource($this->whenLoaded('student'))
        ];
    }
}
