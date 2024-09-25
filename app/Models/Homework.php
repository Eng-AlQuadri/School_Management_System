<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Homework extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_id',
        'subject_id',
        'assigned_by',
        'date'
    ];

    public function classm()
    {
        return $this->belongsTo(Classm::class, 'class_id');
    }

    public function subject()
    {
        return $this->belongsTo(Subjects::class, 'subject_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }
}
