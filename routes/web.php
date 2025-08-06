<?php

use App\Http\Controllers\Admin\MotifController as AdminMotifController;
use App\Http\Controllers\MotifController;
use App\Http\Controllers\DesignEditorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\DashboardController;



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

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    

Route::get('/user/dashboard', function () {
    return Inertia::render('User/Dashboard');
})->name('user.dashboard');

Route::get('/user/motif', function () {
    return Inertia::render('User/Motif');
})->name('user.motif');

Route::get('/user/konveksi', function () {
    return Inertia::render('User/Konveksi');
})->name('user.konveksi');

Route::get('/user/bantuan', function () {
    return Inertia::render('User/Bantuan');
})->name('user.bantuan');

Route::get('/user/produksi', function () {
    return Inertia::render('User/Produksi');
})->name('user.produksi');

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
