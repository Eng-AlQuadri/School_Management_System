<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentStudents extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'parent_id'
    ];
}
