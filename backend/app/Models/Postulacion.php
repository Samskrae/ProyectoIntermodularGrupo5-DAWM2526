<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Postulacion extends Model
{
    protected $table = 'POSTULACION';

    // Desactivamos los timestamps estándar si prefieres usar tus propias columnas de fecha
    public $timestamps = false;

    protected $fillable = [
        'alumno_id',
        'oferta_id',
        'estado',
        'carta_presentacion',
        'fecha_postulacion',
        'fecha_respuesta',
    ];

    protected $casts = [
        'fecha_postulacion' => 'datetime',
        'fecha_respuesta' => 'datetime',
    ];

    public function alumno(): BelongsTo
    {
        return $this->belongsTo(Alumno::class, 'alumno_id');
    }

    public function oferta(): BelongsTo
    {
        return $this->belongsTo(Oferta::class, 'oferta_id');
    }
}