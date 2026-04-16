<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Oferta extends Model
{
    protected $table = 'OFERTA_EMPLEO';
    
    protected $fillable = [
        'empresa_id',
        'titulo',
        'descripcion',
        'sector',
        'ubicacion',
        'tipo_contrato',
        'salario_min',
        'salario_max',
        'vacantes',
        'fecha_cierre',
        'requisitos',
        'beneficios',
        'estado',
    ];

    protected $casts = [
        'fecha_cierre' => 'date',
        'salario_min' => 'decimal:2',
        'salario_max' => 'decimal:2',
    ];

    public function empresa(): BelongsTo
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function postulaciones(): HasMany
    {
        return $this->hasMany(Postulacion::class, 'oferta_id');
    }
}
