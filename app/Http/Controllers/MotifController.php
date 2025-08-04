<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Motif;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MotifController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Motif::all());
    }
    
}