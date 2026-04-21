<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use App\Models\Tecnologia;
use Illuminate\Http\Request;

class AlumnoController extends Controller
{
    public function index()
    {
        return response()->json(Alumno::with('tecnologias')->get(), 200);
    }

    public function show($id)
    {
        $alumno = Alumno::with('tecnologias')->find($id);
        if (!$alumno) {
            return response()->json(['error' => 'Alumno no encontrado'], 404);
        }
        return response()->json($alumno, 200);
    }

    public function update(Request $request, $id)
    {
        $alumno = Alumno::find($id);
        if (!$alumno) {
            return response()->json(['error' => 'Alumno no encontrado'], 404);
        }

        // Validamos solo nombre y el array de nombres de tecnologías
        $validated = $request->validate([
            'nombre' => 'sometimes|string',
            'tecnologias' => 'sometimes|array',
        ]);

        // Actualizamos nombre
        $alumno->update($validated);

        // Sincronizamos tecnologías por nombre
        if ($request->has('tecnologias')) {
            $ids = Tecnologia::whereIn('nombre', $request->tecnologias)->pluck('id');
            $alumno->tecnologias()->sync($ids);
        }

        return response()->json($alumno->load('tecnologias'), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string',
            'email' => 'required|email|unique:ALUMNO,email',
            'password' => 'required|min:6',
            'tecnologias' => 'sometimes|array'
        ]);

        $alumno = Alumno::create($validated);

        if ($request->has('tecnologias')) {
            $ids = Tecnologia::whereIn('nombre', $request->tecnologias)->pluck('id');
            $alumno->tecnologias()->sync($ids);
        }

        return response()->json($alumno->load('tecnologias'), 201);
    }

    public function destroy($id)
    {
        $alumno = Alumno::find($id);
        if (!$alumno)
            return response()->json(['error' => 'No encontrado'], 404);
        $alumno->delete();
        return response()->json(['mensaje' => 'Eliminado'], 200);
    }
}