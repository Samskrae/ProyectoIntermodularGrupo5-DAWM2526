<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // ========== ALUMNO/ESTUDIANTE ==========

    public function registerAlumno(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:ALUMNO',
            'password' => 'required|min:8|confirmed',
        ]);

        $alumno = Alumno::create([
            'nombre' => $validated['nombre'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $alumno->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Alumno registrado exitosamente',
            'user' => $alumno,
            'token' => $token
        ], 201);
    }

    public function loginAlumno(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $alumno = Alumno::where('email', $validated['email'])->first();

        if (!$alumno || !Hash::check($validated['password'], $alumno->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales no son correctas.'],
            ]);
        }

        $token = $alumno->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Sesión iniciada',
            'user' => $alumno,
            'token' => $token
        ]);
    }

    // ========== EMPRESA ==========

    public function registerEmpresa(Request $request)
    {
        $validated = $request->validate([
            'nombre_comercial' => 'required|string|unique:EMPRESA',
            'sector' => 'nullable|string',
            'email' => 'required|email|unique:EMPRESA',
            'password' => 'required|min:8|confirmed',
        ]);

        $empresa = Empresa::create([
            'nombre_comercial' => $validated['nombre_comercial'],
            'sector' => $validated['sector'] ?? 'No especificado',
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $empresa->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Empresa registrada exitosamente',
            'user' => $empresa,
            'token' => $token
        ], 201);
    }

    public function loginEmpresa(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $empresa = Empresa::where('email', $validated['email'])->first();

        if (!$empresa || !Hash::check($validated['password'], $empresa->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales no son correctas.'],
            ]);
        }

        $token = $empresa->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Sesión iniciada',
            'user' => $empresa,
            'token' => $token
        ]);
    }

    // ========== LOGOUT ==========

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada exitosamente']);
    }

    // ========== GET CURRENT USER ==========

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
