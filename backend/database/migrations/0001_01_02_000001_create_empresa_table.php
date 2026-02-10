<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('EMPRESA', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_comercial');
            $table->string('sector')->nullable();
            $table->string('contacto')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('EMPRESA');
    }
};
