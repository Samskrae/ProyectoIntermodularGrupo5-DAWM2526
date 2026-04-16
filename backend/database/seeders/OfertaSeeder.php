<?php

namespace Database\Seeders;

use App\Models\Empresa;
use App\Models\Oferta;
use Illuminate\Database\Seeder;

class OfertaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
            
            Oferta::create([
                'empresa_id' => $empresa->id,
                'titulo' => 'Diseñador UX/UI Senior',
                'descripcion' => 'Se busca diseñador UX/UI con experiencia en diseño de aplicaciones web modernas. Serás responsable de crear interfaces intuitivas y atractivas.',
                'sector' => 'Diseño',
                'ubicacion' => 'Barcelona, España',
                'tipo_contrato' => 'Full-time',
                'salario_min' => 28000,
                'salario_max' => 40000,
                'vacantes' => 1,
                'fecha_cierre' => now()->addDays(25),
                'requisitos' => 'Figma, Adobe XD
5+ años de experiencia
Portfolio demostrable
Inglés intermedio',
                'beneficios' => 'Salario competitivo
Flexible schedule
Cursos de diseño
Ambiente creativo',
                'estado' => 'activa'
            ]);

            Oferta::create([
                'empresa_id' => $empresa->id,
                'titulo' => 'DevOps Engineer',
                'descripcion' => 'Buscamos un DevOps Engineer para gestionar nuestra infraestructura cloud y CI/CD pipelines.',
                'sector' => 'Tecnología',
                'ubicacion' => 'Valencia, España',
                'tipo_contrato' => 'Full-time',
                'salario_min' => 35000,
                'salario_max' => 50000,
                'vacantes' => 1,
                'fecha_cierre' => now()->addDays(20),
                'requisitos' => 'Docker, Kubernetes
AWS o GCP
CI/CD tools
Linux',
                'beneficios' => 'Salario muy competitivo
Home office total
Stock options
Capacitación continua',
                'estado' => 'activa'
            ]);
        }
    }
}
