<?php

namespace App\Http\Controllers; 

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class BatikGeneratorController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate(['prompt' => 'required|string|max:1000']);
        $prompt = $request->input('prompt');

        // Path ke interpreter python. Sesuaikan jika perlu (misal 'python3')
        $pythonPath = 'py'; 
        $scriptPath = storage_path('app/python/batik_generator.py');

        $process = new Process([$pythonPath, $scriptPath, $prompt]);
        $process->setTimeout(360); // Timeout 6 menit untuk AI
        $process->run();

        if (!$process->isSuccessful()) {
            // Jika script Python error, kirim pesan errornya ke frontend
            return response()->json(['error' => 'Gagal menjalankan script AI.', 'details' => $process->getErrorOutput()], 500);
        }
        
        // Kirim output (Data URL gambar) dari script Python ke frontend
        return response()->json(['image_data' => $process->getOutput()]);
    }
}