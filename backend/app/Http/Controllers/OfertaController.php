<?php

namespace App\Http\Controllers;

use App\Models\Oferta;
use App\Models\Tecnologia;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OfertaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Oferta::with(['empresa', 'tecnologias']);

        if ($request->has('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('titulo', 'like', "%$search%")
                    ->orWhere('descripcion', 'like', "%$search%");
            });
        }

        return response()->json($query->orderBy('created_at', 'desc')->get());
    }

    public function show($id): JsonResponse
    {
        $oferta = Oferta::with(['empresa', 'tecnologias', 'postulaciones.alumno'])->find($id);
        if (!$oferta)
            return response()->json(['error' => 'No encontrada'], 404);
        return response()->json($oferta);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'ubicacion' => 'required|string',
            'tipo_contrato' => 'required|string',
            'salario_min' => 'nullable', // Lo limpiamos luego
            'salario_max' => 'nullable',
            'vacantes' => 'integer|min:1',
            'tecnologias' => 'nullable|array'
        ]);

        // Limpieza de dinero: quitamos puntos de miles y decimales
        $s_min = isset($validated['salario_min']) ? preg_replace('/\D/', '', explode('.', $validated['salario_min'])[0]) : null;
        $s_max = isset($validated['salario_max']) ? preg_replace('/\D/', '', explode('.', $validated['salario_max'])[0]) : null;

        $oferta = Oferta::create([
            'empresa_id' => auth()->id(),
            'titulo' => $validated['titulo'],
            'descripcion' => $validated['descripcion'],
            'ubicacion' => $validated['ubicacion'],
            'tipo_contrato' => $validated['tipo_contrato'],
            'salario_min' => $s_min,
            'salario_max' => $s_max,
            'vacantes' => $validated['vacantes'] ?? 1,
            'estado' => 'activa'
        ]);

        if ($request->has('tecnologias')) {
            $ids = Tecnologia::whereIn('nombre', $request->tecnologias)->pluck('id');
            $oferta->tecnologias()->sync($ids);
        }

        return response()->json($oferta->load('tecnologias'), 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $oferta = Oferta::find($id);
        if (!$oferta)
            return response()->json(['error' => 'No encontrada'], 404);

        $validated = $request->validate([
            'titulo' => 'sometimes|string',
            'descripcion' => 'sometimes|string',
            'ubicacion' => 'sometimes|string',
            'salario_min' => 'nullable',
            'salario_max' => 'nullable',
            'estado' => 'sometimes|string',
            'vacantes' => 'sometimes|integer',
            'tecnologias' => 'sometimes|array'
        ]);

        // Arreglo del dinero: Si viene con puntos (20.000), los quitamos antes de guardar
        if (isset($validated['salario_min'])) {
            $validated['salario_min'] = preg_replace('/\D/', '', explode('.', (string) $validated['salario_min'])[0]);
        }
        if (isset($validated['salario_max'])) {
            $validated['salario_max'] = preg_replace('/\D/', '', explode('.', (string) $validated['salario_max'])[0]);
        }

        $oferta->update($validated);

        // Sincronizar tecnologías por NOMBRE
        if ($request->has('tecnologias')) {
            $ids = Tecnologia::whereIn('nombre', $request->tecnologias)->pluck('id');
            $oferta->tecnologias()->sync($ids);
        }

        return response()->json($oferta->load('tecnologias'));
    }

    public function destroy($id): JsonResponse
    {
        $oferta = Oferta::find($id);
        if ($oferta)
            $oferta->delete();
        return response()->json(['message' => 'Eliminada']);
    }
}