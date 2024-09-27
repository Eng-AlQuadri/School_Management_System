<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AssignsubjectController;
use App\Http\Controllers\Api\AssignTeacherController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClassmController;
use App\Http\Controllers\Api\ExamController;
use App\Http\Controllers\Api\FeeController;
use App\Http\Controllers\Api\HomeworkController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\ParentController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\SubjectController;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\HomeworkResource;
use App\Http\Resources\StudentResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\Mime\MessageConverter;

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/fees/collect/{fee}', [FeeController::class, 'update']);

    Route::get('/fees/pending', [FeeController::class, 'pendingFees']);

    Route::get('/students/classes/{class}', [StudentController::class, 'studentsAtClass']);

    Route::get('/attendance/classm/{classId}', [AttendanceController::class, 'studentsAtClass']);

    Route::get('/messages/{id}', [MessageController::class, 'index']);

    Route::get('/students/teacher/{id}', [StudentController::class, 'getStudentsByTeacher']);

    Route::get('/exams/teacher/{id}', [ExamController::class, 'getExamsByTeacher']);

    Route::get('/teacherClass/{id}', [AssignTeacherController::class, 'currentClass']);

    Route::apiResource('/admins', AdminController::class);

    Route::apiResource('/teachers', TeacherController::class);

    Route::apiResource('/students', StudentController::class);

    Route::apiResource('/classms', ClassmController::class);

    Route::apiResource('/parents', ParentController::class);

    Route::apiResource('/subjects', SubjectController::class);

    Route::apiResource('/classSubjects', AssignsubjectController::class);

    Route::apiResource('/classTeachers', AssignTeacherController::class); //

    Route::apiResource('/fees', FeeController::class);

    Route::apiResource('/exams', ExamController::class);

    Route::apiResource('/attendance', AttendanceController::class);

    Route::apiResource('/homework', HomeworkController::class);

    Route::apiResource('/users', UserController::class);

    Route::apiResource('/messages', MessageController::class);
});


Route::post('/login', [AuthController::class, 'login']);
