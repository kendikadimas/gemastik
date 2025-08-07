<?php

use App\Http\Controllers\BatikGeneratorController;
use App\Http\Controllers\DesignEditorController;
use App\Http\Controllers\DesignController;
use App\Http\Controllers\MotifController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

// Route halaman utama (welcome) - hanya untuk guest
Route::get('/', function () {
    if (Auth::check()) {
        return redirect('/dashboard');
    }
    
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'auth' => [
            'user' => null
        ]
    ]);
});

// Routes yang memerlukan autentikasi
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard utama - menampilkan desain user
    Route::get('/dashboard', [DesignController::class, 'index'])->name('dashboard');

    // Design routes - penting untuk menyimpan desain
    Route::post('/designs', [DesignController::class, 'store'])->name('designs.store');
    Route::get('/designs/{id}', [DesignController::class, 'show'])->name('designs.show');
    Route::put('/designs/{id}', [DesignController::class, 'update'])->name('designs.update');
    Route::delete('/designs/{id}', [DesignController::class, 'destroy'])->name('designs.destroy');

    // Motif routes
    Route::get('/motif', [MotifController::class, 'index'])->name('motif');
    
    // API endpoint untuk mendapatkan motif untuk editor
    Route::get('/api/motifs/editor', [MotifController::class, 'getForEditor'])->name('motifs.editor');

    // Menu utama
    Route::get('/konveksi', function () {
        return Inertia::render('User/Konveksi');
    })->name('konveksi');

    Route::get('/produksi', function () {
        return Inertia::render('User/Produksi');
    })->name('produksi');
    
    Route::get('/bantuan', function () {
        return Inertia::render('User/Bantuan');
    })->name('bantuan');

    // Editor routes - menggunakan controller
    Route::get('/editor', [DesignEditorController::class, 'create'])->name('editor.create');
    
    // Batik Generator
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
