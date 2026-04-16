<?php

namespace App\Http\Controllers;

use App\Models\OfertaEmpleo;
use Illuminate\Http\Request;

class OfertaEmpleoController extends Controller
{
    public function index()
    {
        return response()->json(OfertaEmpleo::with('empresa','tecnologias')->get());
    }

    public function show($id)
    {
        $oferta = OfertaEmpleo::with('empresa','tecnologias')->findOrFail($id);
        return response()->json($oferta);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'empresa_id' => 'required|integer',
            'titulo' => 'required|string',
            'descripcion' => 'nullable|string',
            'requisitos' => 'nullable|string',
        ]);

        $oferta = OfertaEmpleo::create($data);
        return response()->json($oferta, 201);
    }

    public function update(Request $request, $id)
    {
        $oferta = OfertaEmpleo::findOrFail($id);
        $oferta->update($request->only(['titulo','descripcion','requisitos']));
        return response()->json($oferta);
    }

    public function destroy($id)
    {
        $oferta = OfertaEmpleo::findOrFail($id);
        $oferta->delete();
        return response()->json(null,204);
    }
}
