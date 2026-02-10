<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Empresa extends Model
{
    use HasFactory, HasApiTokens;

    protected $table = 'EMPRESA';

    protected $fillable = ['nombre_comercial', 'sector', 'contacto', 'email', 'password'];
    protected $hidden = ['password'];

    public function ofertas()
    {
        return $this->hasMany(OfertaEmpleo::class, 'empresa_id');
    }
}
