<?php

namespace App\Http\Controllers;

use App\Models\Postulacion;
use App\Models\Oferta;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\QueryException;

class PostulacionController extends Controller
{
    /**
     * Postularse a una oferta
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'oferta_id' => 'required|exists:ofertas,id',
            'carta_presentacion' => 'nullable|string',
        ]);

        // Verificar que el alumno existe y está autenticado
        $alumno = auth()->user();
        if (!$alumno || !isset($alumno->alumno_id)) {
            return response()->json(['error' => 'Solo alumnos pueden postularse'], 403);
        }

        try {
            $postulacion = Postulacion::create([
                'alumno_id' => $alumno->alumno_id,
                'oferta_id' => $request->oferta_id,
                'carta_presentacion' => $request->carta_presentacion,
                'estado' => 'pendiente',
            ]);

            return response()->json($postulacion, 201);
        } catch (QueryException $e) {
            if (strpos($e->getMessage(), 'Duplicate entry') !== false) {
                return response()->json(['error' => 'Ya te has postulado a esta oferta'], 409);
            }
            throw $e;
        }
    }

    /**
     * Ver mis postulaciones
     */
    public function misPostulaciones(): JsonResponse
    {
        $alumno = auth()->user();
        if (!$alumno || !isset($alumno->alumno_id)) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $postulaciones = Postulacion::where('alumno_id', $alumno->alumno_id)
            ->with('oferta.empresa')
            ->orderBy('fecha_postulacion', 'desc')
            ->get();

        return response()->json($postulaciones);
    }

    /**
     * Ver postulaciones a mis ofertas (solo empresas)
     */
    public function postulacionesAMisOfertas(): JsonResponse
    {
        $empresa = auth()->user();
        if (!$empresa || !isset($empresa->empresa_id)) {
            return response()->json(['error' => 'Solo empresas pueden ver esto'], 403);
        }

        $postulaciones = Postulacion::whereHas('oferta', function ($query) use ($empresa) {
            $query->where('empresa_id', $empresa->empresa_id);
        })
        ->with(['alumno', 'oferta'])
        ->orderBy('fecha_postulacion', 'desc')
        ->get();

        return response()->json($postulaciones);
    }

    /**
     * Ver postulaciones de una oferta específica
     */
    public function porOferta($oferta_id): JsonResponse
    {
        $oferta = Oferta::find($oferta_id);

        if (!$oferta) {
            return response()->json(['error' => 'Oferta no encontrada'], 404);
        }

        $empresa = auth()->user();
        if (!$empresa || $oferta->empresa_id !== $empresa->empresa_id) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $postulaciones = Postulacion::where('oferta_id', $oferta_id)
            ->with('alumno')
            ->orderBy('fecha_postulacion', 'desc')
            ->get();

        return response()->json($postulaciones);
    }

    /**
     * Actualizar estado de postulación
     */
    public function updateEstado(Request $request, $id): JsonResponse
    {
        $postulacion = Postulacion::with('oferta')->find($id);

        if (!$postulacion) {
            return response()->json(['error' => 'Postulación no encontrada'], 404);
        }

        $empresa = auth()->user();
        if (!$empresa || $postulacion->oferta->empresa_id !== $empresa->empresa_id) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $request->validate([
            'estado' => 'required|in:pendiente,aceptada,rechazada,retirada',
        ]);

        $postulacion->update([
            'estado' => $request->estado,
            'fecha_respuesta' => now(),
        ]);

        return response()->json($postulacion);
    }

    /**
     * Retirar postulación
     */
    public function retirar($id): JsonResponse
    {
        $postulacion = Postulacion::find($id);

        if (!$postulacion) {
            return response()->json(['error' => 'Postulación no encontrada'], 404);
        }

        $alumno = auth()->user();
        if (!$alumno || $postulacion->alumno_id !== $alumno->alumno_id) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $postulacion->update(['estado' => 'retirada']);

        return response()->json(['message' => 'Postulación retirada']);
    }
}
