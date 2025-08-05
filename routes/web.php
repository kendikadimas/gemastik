<?php

use App\Http\Controllers\Admin\MotifController as AdminMotifController;
use App\Http\Controllers\MotifController;
use App\Http\Controllers\DesignEditorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

Route::get('/tes', function () {
    return Inertia::render('Test');
});


Route::get('/editor/{design?}', [DesignEditorController::class, 'show'])
    ->name('editor.show');
    
Route::get('/motifs/create', [\App\Http\Controllers\Admin\MotifController::class, 'create'])->name('motifs.create');
Route::post('/motifs', [\App\Http\Controllers\Admin\MotifController::class, 'store'])->name('motifs.store');
Route::get('/batikgenerator', function () {
    return Inertia::render('BatikGeneratorPage');
})->name('batik.generator');
// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
