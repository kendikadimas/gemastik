<?php

use App\Http\Controllers\BatikGeneratorController;
use App\Http\Controllers\DesignEditorController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('BatikGeneratorPage'); // Breeze membutuhkan halaman Dashboard
})->middleware(['auth', 'verified'])->name('dashboard');


// Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::get('/batik-generator', function () {
    return Inertia::render('BatikGeneratorPage');
})->middleware(['auth', 'verified'])->name('batik.generator');


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Rute API untuk generate batik
Route::post('/api/batik-generator', [BatikGeneratorController::class, 'generate']);

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return redirect()->route('editor.show');
    });



Route::get('/editor/{design?}', [DesignEditorController::class, 'show'])->name('editor.show');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
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
});

Route::middleware(['auth', 'role:Admin'])->group(function () {
    Route::get('/motifs/create', [\App\Http\Controllers\Admin\MotifController::class, 'create'])->name('motifs.create');
    Route::post('/motifs', [\App\Http\Controllers\Admin\MotifController::class, 'store'])->name('motifs.store');
});



require __DIR__.'/auth.php';
