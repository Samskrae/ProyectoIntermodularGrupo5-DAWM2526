<?php

namespace App\Http\Controllers;

use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 * title="ConectorTalento API",
 * version="1.0.0",
 * description="API para el portal de empleo ConectorTalento - Gestión de ofertas, postulaciones y analíticas de mercado.",
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
 * description="Servidor de Desarrollo"
 * )
 * * @OA\SecurityScheme(
 * type="http",
 * description="Autenticación basada en Sanctum. Introduce tu token Bearer.",
 * name="Authorization",
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
     * @OA\Response(response=200, description="Lista de ofertas con sus empresas y tecnologías")
     * )
     */

    /**
     * @OA\Post(
     * path="/ofertas",
     * summary="Crear o Actualizar oferta (Solo Empresas)",
     * description="Nota: El salario se limpia de puntos automáticamente. Las tecnologías se envían como nombres.",
     * tags={"Ofertas"},
     * security={{"sanctum":{}}},
     * @OA\RequestBody(
     * required=true,
     * @OA\JsonContent(
     * required={"titulo","descripcion","tipo_contrato"},
     * @OA\Property(property="titulo", type="string", example="Desarrollador Fullstack"),
     * @OA\Property(property="descripcion", type="string", example="Experto en Laravel y React"),
     * @OA\Property(property="tipo_contrato", type="string", example="Tiempo completo"),
     * @OA\Property(property="salario_min", type="string", example="30.000"),
     * @OA\Property(property="salario_max", type="string", example="45.000"),
     * @OA\Property(property="tecnologias", type="array", @OA\Items(type="string", example="React")),
     * @OA\Property(property="estado", type="string", example="activa")
     * )
     * ),
     * @OA\Response(response=201, description="Oferta procesada correctamente")
     * )
     */

    /**
     * @OA\Post(
     * path="/postulaciones",
     * summary="Postularse a una oferta (Solo Alumnos)",
     * tags={"Postulaciones"},
     * security={{"sanctum":{}}},
     * @OA\RequestBody(
     * required=true,
     * @OA\JsonContent(
     * required={"oferta_id"},
     * @OA\Property(property="oferta_id", type="integer", example=1),
     * @OA\Property(property="carta_presentacion", type="string", example="Texto de motivación o resumen.")
     * )
     * ),
     * @OA\Response(response=201, description="Postulación registrada")
     * )
     */

    /**
     * @OA\Get(
     * path="/tendencias",
     * summary="Obtener datos para gráficas",
     * tags={"Analíticas"},
     * @OA\Response(response=200, description="Histórico de demanda por tecnología")
     * )
     */
}