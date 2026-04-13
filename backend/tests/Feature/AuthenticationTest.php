<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Alumno;
use App\Models\Empresa;

class AuthenticationTest extends TestCase
{
    /**
     * Test: Registrar un alumno
     */
    public function test_alumno_registration(): void
    {
        $response = $this->postJson('/api/register-alumno', [
            'nombre' => 'Juan Pérez',
            'email' => 'juan@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(['token', 'user']);
        $this->assertDatabaseHas('ALUMNO', [
            'email' => 'juan@example.com',
        ]);
    }

    /**
     * Test: Login alumno
     */
    public function test_alumno_login(): void
    {
        $alumno = Alumno::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login-alumno', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['token', 'user']);
    }

    /**
     * Test: Login con credenciales inválidas
     */
    public function test_login_with_invalid_credentials(): void
    {
        $response = $this->postJson('/api/login-alumno', [
            'email' => 'nonexistent@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401);
    }

    /**
     * Test: Registrar empresa
     */
    public function test_empresa_registration(): void
    {
        $response = $this->postJson('/api/register-empresa', [
            'nombre_comercial' => 'Tech Company',
            'sector' => 'Tecnología',
            'email' => 'empresa@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('EMPRESA', [
            'email' => 'empresa@example.com',
        ]);
    }

    /**
     * Test: Email único en registro
     */
    public function test_registration_with_duplicate_email(): void
    {
        Alumno::factory()->create([
            'email' => 'test@example.com',
        ]);

        $response = $this->postJson('/api/register-alumno', [
            'nombre' => 'Otro Usuario',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422);
    }
}
