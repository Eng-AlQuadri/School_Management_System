<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherClasses extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_id',
        'teacher_id',
        'created_by'
    ];

    public function classm()
    {
        return $this->belongsTo(Classm::class, 'class_id');
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
