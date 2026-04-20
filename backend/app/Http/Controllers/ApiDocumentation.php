<?php

namespace App\Http\Controllers;

use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 * title="ConectorTalento API",
 * version="1.0.0",
 * description="API para el portal de empleo ConectorTalento - gestión de ofertas, postulaciones y perfil profesional",
 * contact=@OA\Contact(
 * name="Equipo ConectorTalento",
 * email="support@conectortalento.com"
 * ),
 * license=@OA\License(
 * name="MIT"
 * )
 * )
 * * @OA\Server(
 * url="http://localhost:8000/api",
 * description="Development server"
 * )
 * * @OA\SecurityScheme(
 * type="http",
 * description="Login con email y password para obtener el token",
 * name="Token based authentication",
 * in="header",
 * scheme="bearer",
 * bearerFormat="JWT",
 * securityScheme="sanctum"
 * )
 */
class ApiDocumentation
{
    /**
     * @OA\Post(
     * path="/register-alumno",
     * summary="Registrar nuevo alumno",
     * tags={"Autenticación"},
     * @OA\RequestBody(
     * required=true,
     * @OA\JsonContent(
     * required={"nombre","email","password","password_confirmation"},
     * @OA\Property(property="nombre", type="string", example="Juan Pérez"),
     * @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
     * @OA\Property(property="password", type="string", format="password", example="password123"),
     * @OA\Property(property="password_confirmation", type="string", format="password", example="password123")
     * )
     * ),
     * @OA\Response(response=201, description="Alumno registrado exitosamente"),
     * @OA\Response(response=422, description="Error de validación")
     * )
     */

    /**
     * @OA\Post(
     * path="/login-alumno",
     * summary="Login para alumno",
     * tags={"Autenticación"},
     * @OA\RequestBody(
     * required=true,
     * @OA\JsonContent(
     * required={"email","password"},
     * @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
     * @OA\Property(property="password", type="string", format="password", example="password123")
     * )
     * ),
     * @OA\Response(response=200, description="Login exitoso"),
     * @OA\Response(response=401, description="Credenciales inválidas")
     * )
     */

    /**
     * @OA\Post(
     * path="/register-empresa",
     * summary="Registrar nueva empresa",
     * tags={"Autenticación"},
     * @OA\RequestBody(
     * required=true,
     * @OA\JsonContent(
     * required={"nombre_comercial","email","password","password_confirmation"},
     * @OA\Property(property="nombre_comercial", type="string", example="Tech Company SL"),
     * @OA\Property(property="email", type="string", format="email", example="info@techcompany.com"),
     * @OA\Property(property="password", type="string", format="password", example="password123"),
     * @OA\Property(property="password_confirmation", type="string", format="password", example="password123")
     * )
     * ),
     * @OA\Response(response=201, description="Empresa registrada exitosamente")
     * )
     */

    /**
     * @OA\Get(
     * path="/ofertas",
     * summary="Listar todas las ofertas activas",
     * tags={"Ofertas"},
     * @OA\Parameter(
     * name="search",
     * in="query",
     * description="Búsqueda por título o descripción",
     * required=false,
     * @OA\Schema(type="string")
     * ),
     * @OA\Parameter(
     * name="tipo_contrato",
     * in="query",
     * description="Filtrar por tipo de contrato",
     * required=false,
     * @OA\Schema(type="string", enum={"Tiempo completo", "Tiempo parcial", "Contrato temporal", "Freelance", "Prácticas"})
     * ),
     * @OA\Response(response=200, description="Lista de ofertas paginada")
     * )
     */

    /**
     * @OA\Post(
     * path="/ofertas",
     * summary="Crear nueva oferta (solo empresas)",
     * tags={"Ofertas"},
     * security={{"sanctum":{}}},
     * @OA\RequestBody(
     * required=true,
     * @OA\JsonContent(
     * required={"titulo","descripcion","tipo_contrato"},
     * @OA\Property(property="titulo", type="string", example="Desarrollador Fullstack"),
     * @OA\Property(property="descripcion", type="string", example="Buscamos experto en Laravel y Next.js"),
     * @OA\Property(property="tipo_contrato", type="string", enum={"Tiempo completo", "Tiempo parcial", "Contrato temporal", "Freelance", "Prácticas"}),
     * @OA\Property(property="ubicacion", type="string", example="Madrid, España"),
     * @OA\Property(property="salario_min", type="number", example=30000),
     * @OA\Property(property="salario_max", type="number", example=45000),
     * @OA\Property(property="vacantes", type="integer", example=1),
     * @OA\Property(property="tecnologias", type="array", @OA\Items(type="integer", example=1))
     * )
     * ),
     * @OA\Response(response=201, description="Oferta creada exitosamente")
     * )
     */

    /**
     * @OA\Post(
     * path="/postulaciones",
     * summary="Postularse a una oferta (solo alumnos)",
     * tags={"Postulaciones"},
     * security={{"sanctum":{}}},
     * @OA\RequestBody(
     * required=true,
     * @OA\JsonContent(
     * required={"oferta_id"},
     * @OA\Property(property="oferta_id", type="integer", example=5),
     * @OA\Property(property="carta_presentacion", type="string", example="Me gustaría aplicar porque...")
     * )
     * ),
     * @OA\Response(response=201, description="Postulación enviada exitosamente")
     * )
     */

    /**
     * @OA\Get(
     * path="/mis-ofertas",
     * summary="Ver ofertas publicadas por la empresa",
     * tags={"Ofertas"},
     * security={{"sanctum":{}}},
     * @OA\Response(response=200, description="Lista de mis ofertas")
     * )
     */
}