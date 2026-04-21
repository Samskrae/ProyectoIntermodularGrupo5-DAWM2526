<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Oferta extends Model
{
    protected $table = 'OFERTA_EMPLEO';

    protected $fillable = [
        'empresa_id',
        'titulo',
        'descripcion',
        'ubicacion',
        'tipo_contrato',
        'salario_min',
        'salario_max',
        'vacantes',
        'estado',
    ];

    protected $casts = [
        // Mantenemos decimal para que Laravel no redondee, 
        // pero en el controlador lo trataremos como entero.
        'salario_min' => 'decimal:2',
        'salario_max' => 'decimal:2',
    ];

    // Relación con la Empresa
    public function empresa(): BelongsTo
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    // Relación con Postulaciones
    public function postulaciones(): HasMany
    {
        return $this->hasMany(Postulacion::class, 'oferta_id');
    }

    // RELACIÓN CLAVE: Tecnologías de la oferta (los "requisitos")
    // Se usa la tabla pivote para conectar Ofertas con Tecnologías
    public function tecnologias(): BelongsToMany
    {
        return $this->belongsToMany(Tecnologia::class, 'OFERTA_TECNOLOGIA', 'oferta_id', 'tecnologia_id');
    }
}