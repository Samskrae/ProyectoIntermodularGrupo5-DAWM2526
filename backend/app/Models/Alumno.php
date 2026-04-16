<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Alumno extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'ALUMNO';

    protected $fillable = ['nombre', 'email', 'password', 'apellidos', 'estado_academico', 'perfil_url'];
    protected $hidden = ['password'];

    public function perfil()
    {
        return $this->hasOne(PerfilProfesional::class, 'alumno_id');
    }

    public function postulaciones()
    {
        return $this->hasMany(Postulacion::class, 'alumno_id');
    }

    public function tecnologias()
    {
        return $this->belongsToMany(Tecnologia::class, 'PERFIL_TECNOLOGIA', 'alumno_id', 'tecnologia_id');
    }
}
