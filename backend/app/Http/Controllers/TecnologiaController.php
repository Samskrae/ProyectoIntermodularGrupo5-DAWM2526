<?php

namespace App\Http\Controllers;

use App\Models\Tecnologia;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TecnologiaController extends Controller
{
    /**
     * Listar todas las tecnologías
     */
    public function index(): JsonResponse
    {
        $tecnologias = Tecnologia::orderBy('nombre')->get();

        return response()->json(['data' => $tecnologias]);
    }

    /**
     * Ver una tecnología específica
     */
    public function show($id): JsonResponse
    {
        $tecnologia = Tecnologia::find($id);

        if (!$tecnologia) {
            return response()->json(['error' => 'Tecnología no encontrada'], 404);
        }

        return response()->json($tecnologia);
    }
}