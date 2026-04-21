<?php

namespace App\Http\Controllers;

use App\Models\TendenciaMercado;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TendenciaMercadoController extends Controller
{
    /**
     * Listado general de tendencias
     * Útil para tablas comparativas o dashboards globales.
     */
    public function index(): JsonResponse
    {
        // Ordenamos por fecha para que los datos tengan sentido cronológico
        $tendencias = TendenciaMercado::with('tecnologia')
            ->orderBy('fecha_analisis', 'asc')
            ->get();

        return response()->json($tendencias, 200);
    }

    /**
     * Ver una tendencia específica
     */
    public function show($id): JsonResponse
    {
        $tendencia = TendenciaMercado::with('tecnologia')->find($id);

        if (!$tendencia) {
            return response()->json(['error' => 'Tendencia no encontrada'], 404);
        }

        return response()->json($tendencia, 200);
    }

    /**
     * Crucial para las gráficas de una tecnología concreta
     * Ejemplo: Evolución de React en los últimos meses
     */
    public function byTecnologia($tecnologiaId): JsonResponse
    {
        $tendencias = TendenciaMercado::where('tecnologia_id', $tecnologiaId)
            ->orderBy('fecha_analisis', 'asc') // Fundamental para Recharts/Chart.js
            ->get();

        return response()->json($tendencias, 200);
    }
}