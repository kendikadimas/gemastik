<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Design extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'canvas_data',
        'preview_image_path',
    ];

    protected $casts = [
        'canvas_data' => 'array', // Otomatis konversi JSON ke array
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}