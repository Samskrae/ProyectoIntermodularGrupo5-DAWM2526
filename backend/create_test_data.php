<?php

use App\Models\Empresa;
use App\Models\Oferta;

$empresa = Empresa::first();
if ($empresa) {
    Oferta::create([
        'empresa_id' => $empresa->id,
        'titulo' => 'Desarrollador Full Stack PHP',
        'descripcion' => 'Buscamos un desarrollador Full Stack con experiencia en Laravel y React. Trabajarás en proyectos desafiantes y crecerás junto a nuestro equipo.',
        'sector' => 'Tecnología',
        'ubicacion' => 'Madrid, España',
        'tipo_contrato' => 'Full-time',
        'salario_min' => 30000,
        'salario_max' => 45000,
        'vacantes' => 2,
        'fecha_cierre' => now()->addDays(30),
        'requisitos' => 'PHP, Laravel, React, MySQL
3+ años de experiencia
Español fluido',
        'beneficios' => 'Salario competitivo
Home office
Seguro médico
Formación continua',
        'estado' => 'activa'
    ]);
    
    echo "Oferta creada exitosamente\n";
} else {
    echo "No hay empresas en la base de datos\n";
}
