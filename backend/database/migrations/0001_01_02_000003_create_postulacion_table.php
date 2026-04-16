<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('POSTULACION', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alumno_id')->constrained('ALUMNO')->onDelete('cascade');
            $table->foreignId('oferta_id')->constrained('OFERTA_EMPLEO')->onDelete('cascade');
            $table->timestamp('fecha_postulacion')->useCurrent();
            $table->string('estado')->default('Enviada');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('POSTULACION');
    }
};
