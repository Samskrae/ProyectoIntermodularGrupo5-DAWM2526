<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Alumno;
use App\Models\Empresa;
use App\Models\Oferta;

class PostulacionesTest extends TestCase
{
    protected Alumno $alumno;
    protected Oferta $oferta;
    protected string $token;

    public function setUp(): void
    {
        parent::setUp();
        
        $this->alumno = Alumno::factory()->create();
        $empresa = Empresa::factory()->create();
        $this->oferta = Oferta::factory()->create(['empresa_id' => $empresa->id]);
        
        // Obtener token del alumno
        $response = $this->postJson('/api/login-alumno', [
            'email' => $this->alumno->email,
            'password' => $this->alumno->password,
        ]);
        
        $this->token = $response->json('token');
    }

    /**
     * Test: Alumno puede postularse a oferta
     */
    public function test_alumno_can_apply(): void
    {
        $response = $this->postJson('/api/postulaciones', [
            'oferta_id' => $this->oferta->id,
            'carta_presentacion' => 'Soy un candidato interesado...',
        ], [
            'Authorization' => "Bearer {$this->token}",
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('POSTULACION', [
            'alumno_id' => $this->alumno->id,
            'oferta_id' => $this->oferta->id,
        ]);
    }

    /**
     * Test: No puede duplicar postulación
     */
    public function test_cannot_apply_twice(): void
    {
        // Primera postulación
        $this->postJson('/api/postulaciones', [
            'oferta_id' => $this->oferta->id,
        ], [
            'Authorization' => "Bearer {$this->token}",
        ]);

        // Segunda postulación
        $response = $this->postJson('/api/postulaciones', [
            'oferta_id' => $this->oferta->id,
        ], [
            'Authorization' => "Bearer {$this->token}",
        ]);

        $response->assertStatus(409);
    }

    /**
     * Test: Ver mis postulaciones
     */
    public function test_view_my_applications(): void
    {
        $this->postJson('/api/postulaciones', [
            'oferta_id' => $this->oferta->id,
        ], [
            'Authorization' => "Bearer {$this->token}",
        ]);

        $response = $this->getJson('/api/mis-postulaciones', [
            'Authorization' => "Bearer {$this->token}",
        ]);

        $response->assertStatus(200);
        $this->assertCount(1, $response->json());
    }

    /**
     * Test: No autenticado no puede postularse
     */
    public function test_cannot_apply_without_auth(): void
    {
        $response = $this->postJson('/api/postulaciones', [
            'oferta_id' => $this->oferta->id,
        ]);

        $response->assertStatus(401);
    }

    /**
     * Test: Retirar postulación
     */
    public function test_withdraw_application(): void
    {
        $postulacion = $this->postJson('/api/postulaciones', [
            'oferta_id' => $this->oferta->id,
        ], [
            'Authorization' => "Bearer {$this->token}",
        ])->json();

        $response = $this->deleteJson(
            "/api/postulaciones/{$postulacion['id']}/retirar",
            [],
            ['Authorization' => "Bearer {$this->token}"]
        );

        $response->assertStatus(200);
    }
}
