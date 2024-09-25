<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Http\Resources\MessageResource;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    // Fetch all messages between the current user and the selected contact
    public function index($receiverId)
    {
        $userId = Auth::id(); // Get current authenticated user ID

        // Get messages where the current user is either the sender or receiver
        $messages = Message::where(function ($query) use ($userId, $receiverId) {

            $query->where('sender_id', $userId)

                ->where('reciever_id', $receiverId);
        })->orWhere(function ($query) use ($userId, $receiverId) {

            $query->where('sender_id', $receiverId)

                ->where('reciever_id', $userId);
        })->orderBy('created_at')->get();

        return response()->json([

            'messages' => $messages
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request)
    {
        $data = $request->validated();

        $message = Message::create($data);

        return new MessageResource($message);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMessageRequest $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
