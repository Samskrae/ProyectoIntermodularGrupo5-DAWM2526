<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tecnologia;

class TecnologiaSeeder extends Seeder
{
    public function run(): void
    {
        $tecnologias = [
            // Frontend
            ['nombre' => 'React', 'categoria' => 'Frontend'],
            ['nombre' => 'Next.js', 'categoria' => 'Frontend'],
            ['nombre' => 'Vue.js', 'categoria' => 'Frontend'],
            ['nombre' => 'Angular', 'categoria' => 'Frontend'],
            ['nombre' => 'Svelte', 'categoria' => 'Frontend'],
            ['nombre' => 'Tailwind CSS', 'categoria' => 'Frontend'],
            ['nombre' => 'Bootstrap', 'categoria' => 'Frontend'],
            ['nombre' => 'TypeScript', 'categoria' => 'Frontend'],
            ['nombre' => 'JavaScript', 'categoria' => 'Frontend'],
            ['nombre' => 'HTML5', 'categoria' => 'Frontend'],
            ['nombre' => 'CSS3', 'categoria' => 'Frontend'],
            
            // Backend
            ['nombre' => 'Laravel', 'categoria' => 'Backend'],
            ['nombre' => 'Node.js', 'categoria' => 'Backend'],
            ['nombre' => 'Python', 'categoria' => 'Backend'],
            ['nombre' => 'Django', 'categoria' => 'Backend'],
            ['nombre' => 'Express', 'categoria' => 'Backend'],
            ['nombre' => 'Go', 'categoria' => 'Backend'],
            ['nombre' => 'Ruby on Rails', 'categoria' => 'Backend'],
            ['nombre' => 'PHP', 'categoria' => 'Backend'],
            ['nombre' => 'Java', 'categoria' => 'Backend'],
            ['nombre' => 'Spring Boot', 'categoria' => 'Backend'],
            ['nombre' => 'NestJS', 'categoria' => 'Backend'],

            // Base de Datos
            ['nombre' => 'PostgreSQL', 'categoria' => 'Base de Datos'],
            ['nombre' => 'MySQL', 'categoria' => 'Base de Datos'],
            ['nombre' => 'MongoDB', 'categoria' => 'Base de Datos'],
            ['nombre' => 'Redis', 'categoria' => 'Base de Datos'],
            ['nombre' => 'SQLite', 'categoria' => 'Base de Datos'],

            // Herramientas / DevOps
            ['nombre' => 'Docker', 'categoria' => 'DevOps'],
            ['nombre' => 'Kubernetes', 'categoria' => 'DevOps'],
            ['nombre' => 'Git', 'categoria' => 'Herramientas'],
            ['nombre' => 'GitHub Actions', 'categoria' => 'DevOps'],
            ['nombre' => 'AWS', 'categoria' => 'Nube'],
            ['nombre' => 'Firebase', 'categoria' => 'Nube'],
            ['nombre' => 'Vercel', 'categoria' => 'Nube'],

            // Móvil / Otros
            ['nombre' => 'React Native', 'categoria' => 'Móvil'],
            ['nombre' => 'Flutter', 'categoria' => 'Móvil'],
            ['nombre' => 'Swift', 'categoria' => 'Móvil'],
            ['nombre' => 'Kotlin', 'categoria' => 'Móvil'],
            ['nombre' => 'GraphQL', 'categoria' => 'API'],
        ];

        foreach ($tecnologias as $tech) {
            Tecnologia::updateOrCreate(
                ['nombre' => $tech['nombre']], // Evita duplicados si lo corres dos veces
                ['categoria' => $tech['categoria']]
            );
        }
    }
}