<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request)
    {
        return [
            'sender_id' => $this->sender_id,
            'reciever_id' => $this->reciever_id,
            'content' => $this->content,
        ];
    }
}
