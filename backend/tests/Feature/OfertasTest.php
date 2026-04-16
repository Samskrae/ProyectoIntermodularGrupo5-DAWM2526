<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Alumno;
use App\Models\Empresa;
use App\Models\Oferta;

class OfertasTest extends TestCase
{
    protected Empresa $empresa;
    protected string $token;

    public function setUp(): void
    {
        parent::setUp();
        
        // Crear empresa y obtener token
        $this->empresa = Empresa::factory()->create();
        $response = $this->postJson('/api/login-empresa', [
            'email' => $this->empresa->email,
            'password' => $this->empresa->password,
        ]);
        
        $this->token = $response->json('token');
    }

    /**
     * Test: Listar ofertas públicamente
     */
    public function test_list_ofertas(): void
    {
        Oferta::factory(5)->create(['empresa_id' => $this->empresa->id]);

        $response = $this->getJson('/api/ofertas');

        $response->assertStatus(200);
        $response->assertJsonStructure(['data', 'current_page', 'total']);
    }

    /**
     * Test: Ver detalle de una oferta
     */
    public function test_view_oferta_detail(): void
    {
        $oferta = Oferta::factory()->create(['empresa_id' => $this->empresa->id]);

        $response = $this->getJson("/api/ofertas/{$oferta->id}");

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => $oferta->id,
            'titulo' => $oferta->titulo,
        ]);
    }

    /**
     * Test: Crear oferta (solo empresa autenticada)
     */
    public function test_create_oferta(): void
    {
        $response = $this->postJson('/api/ofertas', [
            'titulo' => 'Desarrollador Senior',
            'descripcion' => 'Una descripción de la oferta',
            'sector' => 'Tecnología',
            'tipo_contrato' => 'Full-time',
            'vacantes' => 2,
        ], [
            'Authorization' => "Bearer {$this->token}",
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('OFERTA_EMPLEO', [
            'titulo' => 'Desarrollador Senior',
        ]);
    }

    /**
     * Test: No autenticado no puede crear oferta
     */
    public function test_cannot_create_oferta_without_auth(): void
    {
        $response = $this->postJson('/api/ofertas', [
            'titulo' => 'Desarrollador Senior',
            'descripcion' => 'Una descripción',
            'sector' => 'Tecnología',
            'tipo_contrato' => 'Full-time',
            'vacantes' => 2,
        ]);

        $response->assertStatus(401);
    }

    /**
     * Test: Filtrar ofertas por sector
     */
    public function test_filter_ofertas_by_sector(): void
    {
        Oferta::factory(3)->create([
            'empresa_id' => $this->empresa->id,
            'sector' => 'Tecnología',
        ]);
        
        Oferta::factory(2)->create([
            'empresa_id' => $this->empresa->id,
            'sector' => 'Finanzas',
        ]);

        $response = $this->getJson('/api/ofertas?sector=Tecnología');

        $response->assertStatus(200);
        $this->assertCount(3, $response->json('data'));
    }

    /**
     * Test: Ver mis ofertas
     */
    public function test_view_my_ofertas(): void
    {
        Oferta::factory(3)->create(['empresa_id' => $this->empresa->id]);

        $response = $this->getJson('/api/mis-ofertas', [
            'Authorization' => "Bearer {$this->token}",
        ]);

        $response->assertStatus(200);
        $this->assertCount(3, $response->json());
    }
}
