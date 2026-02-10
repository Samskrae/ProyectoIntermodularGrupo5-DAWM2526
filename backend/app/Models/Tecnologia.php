<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tecnologia extends Model
{
    use HasFactory;

    protected $table = 'TECNOLOGIA';

    protected $fillable = ['nombre','categoria'];

    public function perfiles()
    {
        return $this->belongsToMany(Alumno::class, 'PERFIL_TECNOLOGIA', 'tecnologia_id', 'alumno_id');
    }

    public function ofertas()
    {
        return $this->belongsToMany(OfertaEmpleo::class, 'OFERTA_TECNOLOGIA', 'tecnologia_id', 'oferta_id');
    }

    public function tendencias()
    {
        return $this->hasMany(TendenciaMercado::class, 'tecnologia_id');
    }
}
