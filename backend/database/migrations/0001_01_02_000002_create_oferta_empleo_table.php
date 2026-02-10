<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('OFERTA_EMPLEO', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empresa_id')->constrained('EMPRESA')->onDelete('cascade');
            $table->string('titulo');
            $table->text('descripcion')->nullable();
            $table->text('requisitos')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('OFERTA_EMPLEO');
    }
};
