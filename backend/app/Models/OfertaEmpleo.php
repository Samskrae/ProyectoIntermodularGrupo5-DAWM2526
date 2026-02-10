<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfertaEmpleo extends Model
{
    use HasFactory;

    protected $table = 'OFERTA_EMPLEO';

    protected $fillable = ['empresa_id','titulo','descripcion','requisitos'];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function tecnologias()
    {
        return $this->belongsToMany(Tecnologia::class, 'OFERTA_TECNOLOGIA', 'oferta_id', 'tecnologia_id');
    }
}
