<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tecnologia extends Model
{
    use HasFactory;

    protected $table = 'TECNOLOGIA';

    // Mantenemos categoría por si las gráficas filtran por "Frontend/Backend"
    protected $fillable = ['nombre', 'categoria'];

    public function alumnos()
    {
        return $this->belongsToMany(Alumno::class, 'PERFIL_TECNOLOGIA', 'tecnologia_id', 'alumno_id');
    }

    // RELACIÓN CLAVE: Ahora apunta al modelo Oferta (el que estamos usando)
    public function ofertas()
    {
        return $this->belongsToMany(Oferta::class, 'OFERTA_TECNOLOGIA', 'tecnologia_id', 'oferta_id');
    }

    // RESTAURADO: Esto es lo que alimenta tus gráficas
    public function tendencias()
    {
        return $this->hasMany(TendenciaMercado::class, 'tecnologia_id');
    }
}