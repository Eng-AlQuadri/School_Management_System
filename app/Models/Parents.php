<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parents extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'contact_number'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
