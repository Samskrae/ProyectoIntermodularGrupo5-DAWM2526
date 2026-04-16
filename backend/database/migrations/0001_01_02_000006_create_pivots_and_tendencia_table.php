<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('PERFIL_TECNOLOGIA', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alumno_id')->constrained('ALUMNO')->onDelete('cascade');
            $table->foreignId('tecnologia_id')->constrained('TECNOLOGIA')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('OFERTA_TECNOLOGIA', function (Blueprint $table) {
            $table->id();
            $table->foreignId('oferta_id')->constrained('OFERTA_EMPLEO')->onDelete('cascade');
            $table->foreignId('tecnologia_id')->constrained('TECNOLOGIA')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('TENDENCIA_MERCADO', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tecnologia_id')->constrained('TECNOLOGIA')->onDelete('cascade');
            $table->timestamp('fecha_analisis')->useCurrent();
            $table->decimal('demanda_score', 8, 4)->default(0);
            $table->string('fuente_scraping')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('TENDENCIA_MERCADO');
        Schema::dropIfExists('OFERTA_TECNOLOGIA');
        Schema::dropIfExists('PERFIL_TECNOLOGIA');
    }
};
