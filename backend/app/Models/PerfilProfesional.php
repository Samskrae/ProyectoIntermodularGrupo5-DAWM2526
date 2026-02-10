<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerfilProfesional extends Model
{
    use HasFactory;

    protected $table = 'PERFIL_PROFESIONAL';

    protected $fillable = ['alumno_id','resumen_bio'];

    public function alumno()
    {
        return $this->belongsTo(Alumno::class, 'alumno_id');
    }
}
