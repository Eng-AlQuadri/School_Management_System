<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Attendance;
use App\Models\Classm;
use App\Models\ClassModel;
use App\Models\ClassSubjects;
use App\Models\Exam;
use App\Models\Fee;
use App\Models\Homework;
use App\Models\Mark;
use App\Models\Message;
use App\Models\Parents;
use App\Models\ParentStudents;
use App\Models\Student;
use App\Models\Subjects;
use App\Models\Teacher;
use App\Models\TeacherClasses;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Message::factory(100)->create();
    }
}
