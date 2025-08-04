<?php

namespace App\Http\Controllers;

use App\Models\Design;
use Inertia\Inertia;
use Inertia\Response;

class DesignEditorController extends Controller
{
    public function show(Design $design = null): Response
    {
        // Jika ada desain, pastikan hanya pemilik yang bisa membuka
        if ($design && $design->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Editor/DesignEditor', [
            'initialDesign' => $design, // Kirim data desain yang ada ke frontend
        ]);
    }
}