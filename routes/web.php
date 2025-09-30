<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\NoteController;
use App\Http\Controllers\TaskController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/plain', fn() => 'ok');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('tasks', TaskController::class);
    Route::resource('notes', NoteController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
