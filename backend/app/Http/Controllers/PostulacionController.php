<?php

namespace App\Http\Controllers;

use App\Models\Postulacion;
use App\Models\Oferta;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PostulacionController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'oferta_id' => 'required|exists:OFERTA_EMPLEO,id',
            'carta_presentacion' => 'nullable|string',
        ]);

        $alumno = auth()->user();
        if (!$alumno) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        try {
            $postulacion = Postulacion::create([
                'alumno_id' => $alumno->id,
                'oferta_id' => $request->oferta_id,
                'carta_presentacion' => $request->carta_presentacion,
                'estado' => 'pendiente',
                'fecha_postulacion' => now(), // <-- Aquí se guarda tu fecha
            ]);

            return response()->json(['data' => $postulacion], 201);
        } catch (\Exception $e) {
            // Código 23000 suele ser para duplicados en SQL
            if (isset($e->errorInfo) && $e->errorInfo[1] == 1062) {
                return response()->json(['error' => 'Ya te has postulado a esta oferta'], 409);
            }
            return response()->json(['error' => 'Error al procesar: ' . $e->getMessage()], 500);
        }
    }

    public function misPostulaciones(): JsonResponse
    {
        $alumno = auth()->user();

        $postulaciones = Postulacion::where('alumno_id', $alumno->id)
            ->with(['oferta.empresa', 'oferta.tecnologias'])
            ->orderBy('fecha_postulacion', 'desc') // <-- Ordenado por tu fecha
            ->get();

        return response()->json(['data' => $postulaciones]);
    }

    public function postulacionesAMisOfertas(): JsonResponse
    {
        $empresa = auth()->user();

        $postulaciones = Postulacion::whereHas('oferta', function ($query) use ($empresa) {
            $query->where('empresa_id', $empresa->id);
        })
            ->with(['alumno', 'oferta'])
            ->orderBy('fecha_postulacion', 'desc')
            ->get();

        return response()->json(['data' => $postulaciones]);
    }

    public function updateEstado(Request $request, $id): JsonResponse
    {
        $postulacion = Postulacion::with('oferta')->find($id);

        if (!$postulacion || $postulacion->oferta->empresa_id !== auth()->id()) {
            return response()->json(['error' => 'No autorizado o no encontrada'], 403);
        }

        $request->validate(['estado' => 'required|in:pendiente,aceptada,rechazada,retirada']);

        $postulacion->update([
            'estado' => $request->estado,
            'fecha_respuesta' => now(), // Se marca cuando la empresa responde
        ]);

        return response()->json(['data' => $postulacion]);
    }

    public function retirar($id): JsonResponse
    {
        $postulacion = Postulacion::find($id);

        if (!$postulacion || $postulacion->alumno_id !== auth()->id()) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $postulacion->update(['estado' => 'retirada']);

        return response()->json(['message' => 'Postulación retirada']);
    }
}