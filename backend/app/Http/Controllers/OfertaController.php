<?php

namespace App\Http\Controllers;

use App\Models\OfertaEmpleo;
use App\Models\Postulacion;
use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OfertaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = OfertaEmpleo::where('estado', 'activa')->with(['empresa', 'tecnologias']);

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

    public function show($id): JsonResponse
    {
        $oferta = OfertaEmpleo::with(['empresa', 'postulaciones.alumno', 'tecnologias'])->find($id);

        if (!$oferta) {
            return response()->json(['error' => 'Oferta no encontrada'], 404);
        }

        return response()->json($oferta);
    }

    public function store(Request $request): JsonResponse
    {
        $empresa = auth()->user();
        if (!$empresa || !isset($empresa->nombre_comercial)) {
            return response()->json(['error' => 'Solo las empresas pueden crear ofertas'], 403);
        }

        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'tipo_contrato' => 'required|string|in:Tiempo completo,Tiempo parcial,Contrato temporal,Freelance,Prácticas',
            'ubicacion' => 'nullable|string',
            'salario_min' => 'nullable|numeric|min:0',
            'salario_max' => 'nullable|numeric|min:0',
            'vacantes' => 'nullable|integer|min:1',
            'tecnologias' => 'nullable|array',
            'tecnologias.*' => 'integer|exists:TECNOLOGIA,id',
        ]);

        $oferta = OfertaEmpleo::create([
            'empresa_id' => $empresa->id,
            'titulo' => $validated['titulo'],
            'descripcion' => $validated['descripcion'],
            'tipo_contrato' => $validated['tipo_contrato'],
            'ubicacion' => $validated['ubicacion'] ?? null,
            'salario_min' => $validated['salario_min'] ?? null,
            'salario_max' => $validated['salario_max'] ?? null,
            'vacantes' => $validated['vacantes'] ?? 1,
            'estado' => 'activa',
        ]);

        if (!empty($validated['tecnologias'])) {
            $oferta->tecnologias()->sync($validated['tecnologias']);
        }

        return response()->json($oferta->load('tecnologias'), 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $oferta = OfertaEmpleo::find($id);

        if (!$oferta) {
            return response()->json(['error' => 'Oferta no encontrada'], 404);
        }

        if ($oferta->empresa_id !== auth()->id()) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $validated = $request->validate([
            'titulo' => 'string|max:255',
            'descripcion' => 'string',
            'tipo_contrato' => 'string|in:Tiempo completo,Tiempo parcial,Contrato temporal,Freelance,Prácticas',
            'estado' => 'string|in:activa,cerrada,pausada',
            'ubicacion' => 'nullable|string|max:255',
            'salario_min' => 'nullable|numeric|min:0',
            'salario_max' => 'nullable|numeric|min:0',
            'vacantes' => 'nullable|integer|min:1',
            'fecha_cierre' => 'nullable|date_format:Y-m-d',
            'requisitos' => 'nullable|string',
            'beneficios' => 'nullable|string',
        ]);

        $oferta->update($validated);

        return response()->json($oferta);
    }

    public function destroy($id): JsonResponse
    {
        $oferta = OfertaEmpleo::find($id);

        if (!$oferta) {
            return response()->json(['error' => 'Oferta no encontrada'], 404);
        }

        if ($oferta->empresa_id !== auth()->id()) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $oferta->delete();

        return response()->json(['message' => 'Oferta eliminada']);
    }

    public function misOfertas(): JsonResponse
    {
        $empresa = auth()->user();
        if (!$empresa) {
            return response()->json(['error' => 'No autorizado'], 401);
        }

        $ofertas = OfertaEmpleo::where('empresa_id', $empresa->id)
            ->with(['empresa', 'tecnologias'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($ofertas);
    }
}