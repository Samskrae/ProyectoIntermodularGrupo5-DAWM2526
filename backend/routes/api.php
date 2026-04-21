<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthController,
    AlumnoController,
    EmpresaController,
    OfertaController,
    PostulacionController,
    TecnologiaController,
    TendenciaMercadoController
};

// --- RUTAS PÚBLICAS ---
Route::get('/health', fn() => response()->json(['status' => 'ok']));

// Auth
Route::post('/register-alumno', [AuthController::class, 'registerAlumno']);
Route::post('/login-alumno', [AuthController::class, 'loginAlumno']);
Route::post('/register-empresa', [AuthController::class, 'registerEmpresa']);
Route::post('/login-empresa', [AuthController::class, 'loginEmpresa']);

// Visualización de Ofertas (Público para que los alumnos vean qué hay)
Route::get('/ofertas', [OfertaController::class, 'index']);
Route::get('/ofertas/{id}', [OfertaController::class, 'show']);

// Tecnologías y Tendencias (Lectura pública)
Route::get('/tecnologias', [TecnologiaController::class, 'index']);
Route::get('/tendencias', [TendenciaMercadoController::class, 'index']);
Route::get('/tendencias/tecnologia/{tecnologiaId}', [TendenciaMercadoController::class, 'byTecnologia']);


// --- RUTAS PROTEGIDAS (Requieren Token) ---
Route::middleware('auth:sanctum')->group(function () {

    // Usuario actual y Logout
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // OFERTAS (Gestión de empresa)
    Route::get('/mis-ofertas', [OfertaController::class, 'misOfertas']); // <--- Importante que esté arriba
    Route::post('/ofertas', [OfertaController::class, 'store']);
    Route::put('/ofertas/{id}', [OfertaController::class, 'update']);
    Route::delete('/ofertas/{id}', [OfertaController::class, 'destroy']);

    // POSTULACIONES
    // Para Alumnos
    Route::post('/postulaciones', [PostulacionController::class, 'store']);
    Route::get('/mis-postulaciones', [PostulacionController::class, 'misPostulaciones']);
    Route::delete('/postulaciones/{id}/retirar', [PostulacionController::class, 'retirar']);

    // Para Empresas
    Route::get('/postulaciones-mis-ofertas', [PostulacionController::class, 'postulacionesAMisOfertas']);
    Route::get('/ofertas/{oferta_id}/postulaciones', [PostulacionController::class, 'porOferta']);
    Route::put('/postulaciones/{id}/estado', [PostulacionController::class, 'updateEstado']);

    // Recursos de perfil
    Route::apiResource('alumnos', AlumnoController::class)->only(['show', 'update']);
    Route::apiResource('empresas', EmpresaController::class)->only(['show', 'update']);
});