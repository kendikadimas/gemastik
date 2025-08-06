<?php

use App\Http\Controllers\BatikGeneratorController;
use App\Http\Controllers\DesignEditorController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\DashboardController;

// Route halaman utama (welcome)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'auth' => [
            'user' => Auth::user()
        ]
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('User/Dashboard'); 
})->middleware(['auth', 'verified'])->name('dashboard');

// Routes yang memerlukan autentikasi
Route::middleware(['auth', 'verified'])->group(function () {
    // Halaman-halaman utama user
    Route::get('/dashboard', fn () => Inertia::render('User/Dashboard'))->name('dashboard');
    Route::get('/motif', fn () => Inertia::render('User/Motif'))->name('motif');
    Route::get('/konveksi', fn () => Inertia::render('User/Konveksi'))->name('konveksi');
    Route::get('/produksi', fn () => Inertia::render('User/Produksi'))->name('produksi');
    Route::get('/bantuan', fn () => Inertia::render('User/Bantuan'))->name('bantuan');

    // Editor routes - hanya bisa diakses dari dalam dashboard
    Route::get('/editor/{design?}', [DesignEditorController::class, 'show'])->name('editor.show');

    // Batik Generator - bisa diakses dari dashboard
    Route::get('/batik-generator', function () {
        return Inertia::render('BatikGeneratorPage');
    })->name('batik.generator');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Admin routes
Route::middleware(['auth', 'role:Admin'])->group(function () {
    Route::get('/motifs/create', [\App\Http\Controllers\Admin\MotifController::class, 'create'])->name('motifs.create');
    Route::post('/motifs', [\App\Http\Controllers\Admin\MotifController::class, 'store'])->name('motifs.store');
});

// API routes
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/api/batik-generator', [BatikGeneratorController::class, 'generate']);

require __DIR__.'/auth.php';
