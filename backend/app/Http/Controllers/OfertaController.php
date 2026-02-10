<?php

namespace App\Http\Controllers;

use App\Models\Oferta;
use App\Models\Postulacion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OfertaController extends Controller
{
    /**
     * Listar todas las ofertas activas con filtros
     */
    public function index(Request $request): JsonResponse
    {
        $query = Oferta::where('estado', 'activa')->with('empresa');

        // Filtrar por sector
        if ($request->has('sector')) {
            $query->where('sector', $request->sector);
        }

        // Filtrar por tipo de contrato
        if ($request->has('tipo_contrato')) {
            $query->where('tipo_contrato', $request->tipo_contrato);
        }

        // Búsqueda por título o descripción
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('titulo', 'like', "%$search%")
                  ->orWhere('descripcion', 'like', "%$search%");
            });
        }

        $ofertas = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json($ofertas);
    }

    /**
     * Ver detalle de una oferta específica
     */
    public function show($id): JsonResponse
    {
        $oferta = Oferta::with(['empresa', 'postulaciones'])->find($id);

        if (!$oferta) {
            return response()->json(['error' => 'Oferta no encontrada'], 404);
        }

        return response()->json($oferta);
    }

    /**
     * Crear una nueva oferta (solo empresas autenticadas)
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'sector' => 'required|string|max:100',
            'ubicacion' => 'nullable|string|max:255',
            'tipo_contrato' => 'required|string|in:Full-time,Part-time,Pasantía,Freelance,Remoto',
            'salario_min' => 'nullable|numeric|min:0',
            'salario_max' => 'nullable|numeric|min:0',
            'vacantes' => 'required|integer|min:1',
            'fecha_cierre' => 'nullable|date|after:today',
            'requisitos' => 'nullable|string',
            'beneficios' => 'nullable|string',
        ]);

        $oferta = Oferta::create([
            'empresa_id' => auth()->id(),
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'sector' => $request->sector,
            'ubicacion' => $request->ubicacion,
            'tipo_contrato' => $request->tipo_contrato,
            'salario_min' => $request->salario_min,
            'salario_max' => $request->salario_max,
            'vacantes' => $request->vacantes,
            'fecha_cierre' => $request->fecha_cierre,
            'requisitos' => $request->requisitos,
            'beneficios' => $request->beneficios,
            'estado' => 'activa',
        ]);

        return response()->json($oferta, 201);
    }

    /**
     * Actualizar una oferta (solo propietario)
     */
    public function update(Request $request, $id): JsonResponse
    {
        $oferta = Oferta::find($id);

        if (!$oferta) {
            return response()->json(['error' => 'Oferta no encontrada'], 404);
        }

        if ($oferta->empresa_id !== auth()->id()) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $request->validate([
            'titulo' => 'string|max:255',
            'descripcion' => 'string',
            'sector' => 'string|max:100',
            'tipo_contrato' => 'string|in:Full-time,Part-time,Pasantía,Freelance,Remoto',
            'estado' => 'string|in:activa,cerrada,pausada',
        ]);

        $oferta->update($request->only([
            'titulo', 'descripcion', 'sector', 'ubicacion', 'tipo_contrato',
            'salario_min', 'salario_max', 'vacantes', 'fecha_cierre',
            'requisitos', 'beneficios', 'estado'
        ]));

        return response()->json($oferta);
    }

    /**
     * Eliminar una oferta (solo propietario)
     */
    public function destroy($id): JsonResponse
    {
        $oferta = Oferta::find($id);

        if (!$oferta) {
            return response()->json(['error' => 'Oferta no encontrada'], 404);
        }

        if ($oferta->empresa_id !== auth()->id()) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $oferta->delete();

        return response()->json(['message' => 'Oferta eliminada']);
    }

    /**
     * Obtener mis ofertas (solo empresas)
     */
    public function misOfertas(): JsonResponse
    {
        $ofertas = Oferta::where('empresa_id', auth()->id())
            ->with('postulaciones.alumno')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($ofertas);
    }
}
