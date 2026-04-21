<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Empresa extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'EMPRESA';

    // Solo lo que me has pedido: nombre_comercial, sector, email y password
    protected $fillable = [
        'nombre_comercial',
        'sector',
        'email',
        'password'
    ];

    protected $hidden = ['password'];

    // Relación con las ofertas (Importante para que la empresa gestione sus vacantes)
    public function ofertas()
    {
        return $this->hasMany(OfertaEmpleo::class, 'empresa_id');
    }
}