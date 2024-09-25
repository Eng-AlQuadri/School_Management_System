<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{

    public static $wrap = false;

    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'classm' => new ClassmResource($this->whenLoaded('classm')),
            'user' => new UserResource($this->whenLoaded('user'))
        ];
    }
}
