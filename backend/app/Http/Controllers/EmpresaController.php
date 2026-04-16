<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    public function index()
    {
        return response()->json(Empresa::all(), 200);
    }

    public function show($id)
    {
        $empresa = Empresa::find($id);
        if (!$empresa) {
            return response()->json(['error' => 'Empresa no encontrada'], 404);
        }
        return response()->json($empresa, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_comercial' => 'required|string',
            'sector' => 'nullable|string',
            'contacto' => 'nullable|string',
        ]);

        $empresa = Empresa::create($validated);
        return response()->json($empresa, 201);
    }

    public function update(Request $request, $id)
    {
        $empresa = Empresa::find($id);
        if (!$empresa) {
            return response()->json(['error' => 'Empresa no encontrada'], 404);
        }

        $validated = $request->validate([
            'nombre_comercial' => 'sometimes|string',
            'sector' => 'sometimes|nullable|string',
            'contacto' => 'sometimes|nullable|string',
        ]);

        $empresa->update($validated);
        return response()->json($empresa, 200);
    }

    public function destroy($id)
    {
        $empresa = Empresa::find($id);
        if (!$empresa) {
            return response()->json(['error' => 'Empresa no encontrada'], 404);
        }

        $empresa->delete();
        return response()->json(['mensaje' => 'Empresa eliminada'], 200);
    }
}
