<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Alumno extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'ALUMNO';

    protected $fillable = [
        'nombre',
        'email',
        'password'
    ];

    protected $hidden = ['password'];

    public function postulaciones()
    {
        return $this->hasMany(Postulacion::class, 'alumno_id');
    }

    public function tecnologias()
    {
        return $this->belongsToMany(Tecnologia::class, 'PERFIL_TECNOLOGIA', 'alumno_id', 'tecnologia_id');
    }
}