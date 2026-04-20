<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('OFERTA_EMPLEO', function (Blueprint $table) {
            // Agregar columnas faltantes si no existen
            if (!Schema::hasColumn('OFERTA_EMPLEO', 'sector')) {
                $table->string('sector')->nullable()->after('descripcion');
            }
            if (!Schema::hasColumn('OFERTA_EMPLEO', 'ubicacion')) {
                $table->string('ubicacion')->nullable()->after('sector');
            }
            if (!Schema::hasColumn('OFERTA_EMPLEO', 'tipo_contrato')) {
                $table->string('tipo_contrato')->nullable()->after('ubicacion');
            }
            if (!Schema::hasColumn('OFERTA_EMPLEO', 'salario_min')) {
                $table->decimal('salario_min', 10, 2)->nullable()->after('tipo_contrato');
            }
            if (!Schema::hasColumn('OFERTA_EMPLEO', 'salario_max')) {
                $table->decimal('salario_max', 10, 2)->nullable()->after('salario_min');
            }
            if (!Schema::hasColumn('OFERTA_EMPLEO', 'vacantes')) {
                $table->integer('vacantes')->default(1)->after('salario_max');
            }
            if (!Schema::hasColumn('OFERTA_EMPLEO', 'fecha_cierre')) {
                $table->date('fecha_cierre')->nullable()->after('vacantes');
            }
            if (!Schema::hasColumn('OFERTA_EMPLEO', 'beneficios')) {
                $table->text('beneficios')->nullable()->after('requisitos');
            }
            if (!Schema::hasColumn('OFERTA_EMPLEO', 'estado')) {
                $table->enum('estado', ['activa', 'cerrada', 'pausada'])->default('activa')->after('beneficios');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('OFERTA_EMPLEO', function (Blueprint $table) {
            $columns = ['sector', 'ubicacion', 'tipo_contrato', 'salario_min', 'salario_max', 'vacantes', 'fecha_cierre', 'beneficios', 'estado'];
            foreach ($columns as $column) {
                if (Schema::hasColumn('OFERTA_EMPLEO', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
