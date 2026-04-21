<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TendenciaMercado extends Model
{
    use HasFactory;

    protected $table = 'TENDENCIA_MERCADO';

    // Fuera fuente_scraping, nos quedamos con el núcleo de la gráfica
    protected $fillable = [
        'tecnologia_id',
        'fecha_analisis',
        'demanda_score'
    ];

    protected $casts = [
        'fecha_analisis' => 'date',
        'demanda_score' => 'integer'
    ];

    public function tecnologia()
    {
        return $this->belongsTo(Tecnologia::class, 'tecnologia_id');
    }
}