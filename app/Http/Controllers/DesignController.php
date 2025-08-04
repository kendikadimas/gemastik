<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Design;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DesignController extends Controller
{
    public function index()
    {
        return Auth::user()->designs;
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'canvas_data' => 'required|json',
        ]);

        $design = Design::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'canvas_data' => $request->canvas_data,
        ]);

        return response()->json($design, 201);
    }
    // Method show, update, destroy bisa ditambahkan kemudian...
}