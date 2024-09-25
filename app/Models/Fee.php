<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'collected_by',
        'amount',
        'status'
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'collected_by');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }
}
