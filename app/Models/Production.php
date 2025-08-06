<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Production extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'production_status',
        'quantity',
        'price_per_unit',
        'total_price',
        'payment_proof_url',
        'payment_status',
        'convection_user_id',
        'user_id',
        'design_id',
        'product_id',
    ];

    // Relasi ke pengguna yang memesan (customer)
    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relasi ke pengguna yang mengerjakan (konveksi)
    public function convection(): BelongsTo
    {
        return $this->belongsTo(User::class, 'convection_user_id');
    }

    public function design(): BelongsTo
    {
        return $this->belongsTo(Design::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}