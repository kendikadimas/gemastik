<?php

namespace App\Http\Controllers;

use App\Models\Design;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DesignController extends Controller
{
    public function index()
    {
        $designs = Auth::user()->designs()
            ->orderBy('updated_at', 'desc')
            ->get();

        return Inertia::render('User/Dashboard', [
            'designs' => $designs
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'canvas_data' => 'required|array',
            'thumbnail' => 'nullable|string' // Base64 image data
        ]);

        $thumbnailPath = null;

        // Simpan thumbnail jika ada
        if ($request->thumbnail) {
            $thumbnailData = $request->thumbnail;
            
            // Remove data:image/jpeg;base64, prefix
            if (strpos($thumbnailData, 'data:image/') === 0) {
                $thumbnailData = substr($thumbnailData, strpos($thumbnailData, ',') + 1);
            }
            
            $thumbnailData = base64_decode($thumbnailData);
            $filename = 'designs/thumbnails/' . Auth::id() . '_' . time() . '.jpg';
            
            Storage::disk('public')->put($filename, $thumbnailData);
            $thumbnailPath = Storage::url($filename);
        }

        $design = Design::create([
            'title' => $request->title,
            'description' => $request->description,
            'canvas_data' => $request->canvas_data,
            'image_url' => $thumbnailPath,
            'user_id' => Auth::id()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Desain berhasil disimpan',
            'design' => $design
        ]);
    }

    public function show($id)
    {
        $design = Design::where('user_id', Auth::id())
            ->findOrFail($id);

        return Inertia::render('Editor/DesignEditor', [
            'initialDesign' => $design
        ]);
    }

    public function update(Request $request, $id)
    {
        $design = Design::where('user_id', Auth::id())
            ->findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'canvas_data' => 'required|array',
            'thumbnail' => 'nullable|string'
        ]);

        $thumbnailPath = $design->image_url;

        // Update thumbnail jika ada
        if ($request->thumbnail) {
            // Hapus thumbnail lama jika ada
            if ($design->image_url) {
                $oldPath = str_replace('/storage/', '', $design->image_url);
                Storage::disk('public')->delete($oldPath);
            }

            $thumbnailData = $request->thumbnail;
            if (strpos($thumbnailData, 'data:image/') === 0) {
                $thumbnailData = substr($thumbnailData, strpos($thumbnailData, ',') + 1);
            }
            
            $thumbnailData = base64_decode($thumbnailData);
            $filename = 'designs/thumbnails/' . Auth::id() . '_' . time() . '.jpg';
            
            Storage::disk('public')->put($filename, $thumbnailData);
            $thumbnailPath = Storage::url($filename);
        }

        $design->update([
            'title' => $request->title,
            'description' => $request->description,
            'canvas_data' => $request->canvas_data,
            'image_url' => $thumbnailPath
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Desain berhasil diperbarui',
            'design' => $design
        ]);
    }

    public function destroy($id)
    {
        $design = Design::where('user_id', Auth::id())
            ->findOrFail($id);

        // Hapus thumbnail jika ada
        if ($design->image_url) {
            $path = str_replace('/storage/', '', $design->image_url);
            Storage::disk('public')->delete($path);
        }

        $design->delete();

        return response()->json([
            'success' => true,
            'message' => 'Desain berhasil dihapus'
        ]);
    }
}