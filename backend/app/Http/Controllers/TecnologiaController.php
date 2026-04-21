<?php

namespace App\Http\Controllers;

use App\Models\Tecnologia;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TecnologiaController extends Controller
{
    /**
     * Listar todas las tecnologías
     * Mantenemos el formato ['data' => $tecnologias] para tus gráficas y filtros
     */
    public function index(): JsonResponse
    {
        // Ordenamos por nombre para que los botones y las gráficas salgan bien
        $tecnologias = Tecnologia::orderBy('nombre')->get();

        return response()->json(['data' => $tecnologias], 200);
    }

    /**
     * Ver una tecnología específica
     */
    public function show($id): JsonResponse
    {
        // Incluimos las tendencias por si la gráfica de una tech específica la necesita
        $tecnologia = Tecnologia::with('tendencias')->find($id);

        if (!$tecnologia) {
            return response()->json(['error' => 'Tecnología no encontrada'], 404);
        }

        return response()->json($tecnologia, 200);
    }
}