<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('motifs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category')->nullable();
            $table->string('preview_image_path');
            $table->string('file_path'); // Sebaiknya path ke file SVG
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('motifs');
    }
};