<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TendenciaMercado extends Model
{
    use HasFactory;

    protected $table = 'TENDENCIA_MERCADO';

    protected $fillable = ['tecnologia_id','fecha_analisis','demanda_score','fuente_scraping'];

    public function tecnologia()
    {
        return $this->belongsTo(Tecnologia::class, 'tecnologia_id');
    }
}
