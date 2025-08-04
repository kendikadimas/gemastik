<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\MotifController;
use App\Http\Controllers\API\DesignController;

// Endpoint untuk mendapatkan semua motif
Route::get('/motifs', [MotifController::class, 'index']);

// Endpoint untuk CRUD data desain
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('designs', DesignController::class);
});