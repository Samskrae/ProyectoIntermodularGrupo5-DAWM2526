<?php

namespace App\Http\Controllers;

use App\Models\TendenciaMercado;
use Illuminate\Http\Request;

class TendenciaMercadoController extends Controller
{
    public function index()
    {
        return response()->json(TendenciaMercado::with('tecnologia')->get(), 200);
    }

    public function show($id)
    {
        $tendencia = TendenciaMercado::with('tecnologia')->find($id);
        if (!$tendencia) {
            return response()->json(['error' => 'Tendencia no encontrada'], 404);
        }
        return response()->json($tendencia, 200);
    }

    public function byTecnologia($tecnologiaId)
    {
        $tendencias = TendenciaMercado::where('tecnologia_id', $tecnologiaId)->get();
        return response()->json($tendencias, 200);
    }
}
