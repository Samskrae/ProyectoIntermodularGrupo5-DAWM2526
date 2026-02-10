<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('POSTULACION', function (Blueprint $table) {
            if (!Schema::hasColumn('POSTULACION', 'carta_presentacion')) {
                $table->text('carta_presentacion')->nullable()->after('estado');
            }
            if (!Schema::hasColumn('POSTULACION', 'fecha_respuesta')) {
                $table->timestamp('fecha_respuesta')->nullable()->after('carta_presentacion');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('POSTULACION', function (Blueprint $table) {
            if (Schema::hasColumn('POSTULACION', 'carta_presentacion')) {
                $table->dropColumn('carta_presentacion');
            }
            if (Schema::hasColumn('POSTULACION', 'fecha_respuesta')) {
                $table->dropColumn('fecha_respuesta');
            }
        });
    }
};
