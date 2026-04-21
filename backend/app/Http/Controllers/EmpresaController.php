<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
            'sector' => 'required|string',
            'email' => 'required|email|unique:EMPRESA,email',
            'password' => 'required|min:6',
        ]);

        // Encriptamos la contraseña antes de guardar
        $validated['password'] = Hash::make($validated['password']);

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
            'sector' => 'sometimes|string',
            'email' => 'sometimes|email|unique:EMPRESA,email,' . $id,
            'password' => 'sometimes|min:6',
        ]);

        // Si viene password, la encriptamos
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

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