<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\OfertaController;
use App\Http\Controllers\PostulacionController;
use App\Http\Controllers\TecnologiaController;
use App\Http\Controllers\TendenciaMercadoController;

// Health check endpoint
Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'message' => 'Backend is running']);
});

// Public auth routes
Route::post('/register-alumno', [AuthController::class, 'registerAlumno']);
Route::post('/login-alumno', [AuthController::class, 'loginAlumno']);
Route::post('/register-empresa', [AuthController::class, 'registerEmpresa']);
Route::post('/login-empresa', [AuthController::class, 'loginEmpresa']);

// Protected auth routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

// Rutas de Alumnos
Route::apiResource('alumnos', AlumnoController::class);

// Rutas de Empresas
Route::apiResource('empresas', EmpresaController::class);

// Rutas públicas de Ofertas
Route::get('/ofertas', [OfertaController::class, 'index']);
Route::get('/ofertas/{id}', [OfertaController::class, 'show']);

// Rutas protegidas de Ofertas (solo empresas)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/ofertas', [OfertaController::class, 'store']);
    Route::put('/ofertas/{id}', [OfertaController::class, 'update']);
    Route::delete('/ofertas/{id}', [OfertaController::class, 'destroy']);
    Route::get('/mis-ofertas', [OfertaController::class, 'misOfertas']);
});

// Rutas protegidas de Postulaciones
Route::middleware('auth:sanctum')->group(function () {
    // Alumno postulándose
    Route::post('/postulaciones', [PostulacionController::class, 'store']);
    Route::get('/mis-postulaciones', [PostulacionController::class, 'misPostulaciones']);
    Route::delete('/postulaciones/{id}/retirar', [PostulacionController::class, 'retirar']);
    
    // Empresa viendo postulaciones
    Route::get('/postulaciones-mis-ofertas', [PostulacionController::class, 'postulacionesAMisOfertas']);
    Route::get('/ofertas/{oferta_id}/postulaciones', [PostulacionController::class, 'porOferta']);
    Route::put('/postulaciones/{id}/estado', [PostulacionController::class, 'updateEstado']);
});

// Rutas de Tendencias de Mercado
Route::get('tendencias', [TendenciaMercadoController::class, 'index']);
Route::get('tendencias/{id}', [TendenciaMercadoController::class, 'show']);
Route::get('tendencias/tecnologia/{tecnologiaId}', [TendenciaMercadoController::class, 'byTecnologia']);

// Rutas de Tecnologías
Route::get('/tecnologias', [TecnologiaController::class, 'index']);
Route::get('/tecnologias/{id}', [TecnologiaController::class, 'show']);
