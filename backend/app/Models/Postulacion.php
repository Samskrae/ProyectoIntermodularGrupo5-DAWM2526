<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Postulacion extends Model
{
    protected $table = 'POSTULACION';
    
    protected $fillable = [
        'alumno_id',
        'oferta_id',
        'estado',
        'carta_presentacion',
        'fecha_respuesta',
        'fecha_postulacion',
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
