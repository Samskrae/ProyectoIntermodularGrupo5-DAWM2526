# 🔐 Implementar Autenticación Backend (Próximo Paso)

Aunque el frontend ya tiene formularios de login/registro, el backend necesita los endpoints de autenticación para que funcione completamente.

## ⚡ Pasos para Implementar Autenticación con Laravel Sanctum

### 1. Instalar Sanctum en el Backend
```bash
docker exec laravel-backend composer require laravel/sanctum
docker exec laravel-backend php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 2. Ejecutar Migraciones de Sanctum
```bash
docker exec laravel-backend php artisan migrate --force
```

### 3. Crear Controlador de Autenticación
Crear archivo: `backend/app/Http/Controllers/AuthController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string',
            'email' => 'required|email|unique:alumno',
            'password' => 'required|min:8|confirmed',
        ]);

        $alumno = Alumno::create([
            'nombre' => $validated['nombre'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $alumno->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $alumno,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $alumno = Alumno::where('email', $validated['email'])->first();

        if (!$alumno || !Hash::check($validated['password'], $alumno->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales no son correctas.'],
            ]);
        }

        $token = $alumno->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $alumno,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada']);
    }
}
```

### 4. Actualizar Rutas de API
En `backend/routes/api.php`:

```php
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Rutas protegidas
    Route::apiResource('alumnos', AlumnoController::class);
});
```

### 5. Configurar Modelo Alumno para Sanctum
En `backend/app/Models/Alumno.php`:

```php
use Laravel\Sanctum\HasApiTokens;

class Alumno extends Model
{
    use HasApiTokens;
    
    protected $table = 'ALUMNO';
    protected $fillable = ['nombre', 'email', 'password'];
    protected $hidden = ['password'];
}
```

### 6. Lo Mismo para Empresa
Crear `AuthEmpresaController` con la misma lógica pero para la tabla `EMPRESA`.

## 🎯 Resultado Final

Con esto, el frontend podrá:

1. ✅ Registrarse: `POST /api/register` → recibe token JWT
2. ✅ Iniciar sesión: `POST /api/login` → recibe token JWT
3. ✅ Acceder a rutas protegidas con header: `Authorization: Bearer TOKEN`
4. ✅ Cerrar sesión: `POST /api/logout`

## 🔗 Flujo Completamente Funcional

```
Frontend (Login)
    ↓
POST /api/login {email, password}
    ↓
Backend (Valida credenciales)
    ↓
Genera token Sanctum
    ↓
Frontend recibe token + user
    ↓
Guarda token en localStorage
    ↓
Usa token en todas las peticiones API
    ↓
localStorage.getItem('token')
Authorization: Bearer {token}
```

## 📝 Variables de Entorno

Si necesitas configurar tokens con expiración, en `.env`:

```
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SESSION_DOMAIN=localhost
```

## ⚠️ Importante

Antes de implementar:
1. El formulario de login/registro ya busca estos endpoints
2. Necesitas crear la migración de Sanctum para la tabla `personal_access_tokens`
3. Los tokens se guardarán automáticamente en localStorage desde el frontend
4. Implementar CORS en `bootstrap/app.php` si es necesario

---

**Comando rápido para comenzar:**
```bash
docker exec laravel-backend composer require laravel/sanctum
```
