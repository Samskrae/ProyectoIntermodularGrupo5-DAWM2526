<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use Illuminate\Http\Request;

class AlumnoController extends Controller
{
    public function index()
    {
        return response()->json(Alumno::all(), 200);
    }

    public function show($id)
    {
        $alumno = Alumno::find($id);
        if (!$alumno) {
            return response()->json(['error' => 'Alumno no encontrado'], 404);
        }
        return response()->json($alumno, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string',
            'apellidos' => 'required|string',
            'estado_academico' => 'nullable|string',
            'perfil_url' => 'nullable|string',
        ]);

        $alumno = Alumno::create($validated);
        return response()->json($alumno, 201);
    }

    public function update(Request $request, $id)
    {
        $alumno = Alumno::find($id);
        if (!$alumno) {
            return response()->json(['error' => 'Alumno no encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'sometimes|string',
            'apellidos' => 'sometimes|string',
            'estado_academico' => 'sometimes|nullable|string',
            'perfil_url' => 'sometimes|nullable|string',
        ]);

        $alumno->update($validated);
        return response()->json($alumno, 200);
    }

    public function destroy($id)
    {
        $alumno = Alumno::find($id);
        if (!$alumno) {
            return response()->json(['error' => 'Alumno no encontrado'], 404);
        }

        $alumno->delete();
        return response()->json(['mensaje' => 'Alumno eliminado'], 200);
    }
}
