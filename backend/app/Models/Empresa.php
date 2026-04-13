<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Empresa extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'EMPRESA';

    protected $fillable = ['nombre_comercial', 'sector', 'contacto', 'email', 'password'];
    protected $hidden = ['password'];

    public function ofertas()
    {
        return $this->hasMany(OfertaEmpleo::class, 'empresa_id');
    }

    // Métodos de autenticación requeridos
    public function getAuthIdentifierName()
    {
        return 'id';
    }

    public function getAuthIdentifier()
    {
        return $this->getKey();
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function getRememberToken()
    {
        return $this->remember_token;
    }

    public function setRememberToken($value)
    {
        $this->remember_token = $value;
    }

    public function getRememberTokenName()
    {
        return 'remember_token';
    }
}
