<?php

namespace App\Http\Controllers;

use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     title="ConectorTalento API",
 *     version="1.0.0",
 *     description="API para el portal de empleo ConectorTalento - gestión de ofertas, postulaciones y perfil profesional",
 *     contact=@OA\Contact(
 *         name="Equipo ConectorTalento",
 *         email="support@conectortalento.com"
 *     ),
 *     license=@OA\License(
 *         name="MIT"
 *     )
 * )
 * 
 * @OA\Server(
 *     url="http://localhost:8000/api",
 *     description="Development server"
 * )
 * 
 * @OA\SecurityScheme(
 *     type="http",
 *     description="Login with username and password to get the authentication token",
 *     name="Token based based authentication",
 *     in="header",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     securityScheme="sanctum"
 * )
 */
class ApiDocumentation
{
    /**
     * @OA\Post(
     *     path="/register-alumno",
     *     summary="Registrar nuevo alumno",
     *     tags={"Autenticación"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre","email","password"},
     *             @OA\Property(property="nombre", type="string", example="Juan Pérez"),
     *             @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123"),
     *             @OA\Property(property="state_academico", type="string", example="Estudiante")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Alumno registrado exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="token", type="string"),
     *             @OA\Property(property="user", type="object")
     *         )
     *     ),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    
    /**
     * @OA\Post(
     *     path="/login-alumno",
     *     summary="Login para alumno",
     *     tags={"Autenticación"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login exitoso",
     *         @OA\JsonContent(
     *             @OA\Property(property="token", type="string"),
     *             @OA\Property(property="user", type="object")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Credenciales inválidas")
     * )
     */

    /**
     * @OA\Post(
     *     path="/register-empresa",
     *     summary="Registrar nueva empresa",
     *     tags={"Autenticación"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre_comercial","email","password"},
     *             @OA\Property(property="nombre_comercial", type="string", example="Tech Company SL"),
     *             @OA\Property(property="sector", type="string", example="Tecnología"),
     *             @OA\Property(property="email", type="string", format="email", example="info@techcompany.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Empresa registrada exitosamente"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */

    /**
     * @OA\Get(
     *     path="/ofertas",
     *     summary="Listar todas las ofertas activas",
     *     tags={"Ofertas"},
     *     @OA\Parameter(
     *         name="sector",
     *         in="query",
     *         description="Filtrar por sector",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="Búsqueda por título o descripción",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de ofertas",
     *         @OA\JsonContent(type="array", @OA\Items(type="object"))
     *     )
     * )
     */

    /**
     * @OA\Get(
     *     path="/ofertas/{id}",
     *     summary="Obtener detalle de una oferta",
     *     tags={"Ofertas"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Detalle de la oferta"),
     *     @OA\Response(response=404, description="Oferta no encontrada")
     * )
     */

    /**
     * @OA\Post(
     *     path="/ofertas",
     *     summary="Crear nueva oferta (solo empresas)",
     *     tags={"Ofertas"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"titulo","descripcion","sector","tipo_contrato"},
     *             @OA\Property(property="titulo", type="string"),
     *             @OA\Property(property="descripcion", type="string"),
     *             @OA\Property(property="sector", type="string"),
     *             @OA\Property(property="tipo_contrato", type="string", enum={"Full-time","Part-time","Pasantía","Freelance"}),
     *             @OA\Property(property="ubicacion", type="string"),
     *             @OA\Property(property="salario_min", type="number"),
     *             @OA\Property(property="salario_max", type="number"),
     *             @OA\Property(property="vacantes", type="integer", example=1),
     *             @OA\Property(property="fecha_cierre", type="string", format="date")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Oferta creada exitosamente"),
     *     @OA\Response(response=401, description="No autorizado"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */

    /**
     * @OA\Post(
     *     path="/postulaciones",
     *     summary="Postularse a una oferta",
     *     tags={"Postulaciones"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"oferta_id"},
     *             @OA\Property(property="oferta_id", type="integer"),
     *             @OA\Property(property="carta_presentacion", type="string")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Postulación enviada exitosamente"),
     *     @OA\Response(response=409, description="Ya te has postulado a esta oferta"),
     *     @OA\Response(response=401, description="No autorizado")
     * )
     */

    /**
     * @OA\Get(
     *     path="/mis-postulaciones",
     *     summary="Ver mis postulaciones",
     *     tags={"Postulaciones"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de mis postulaciones"
     *     ),
     *     @OA\Response(response=401, description="No autorizado")
     * )
     */

    /**
     * @OA\Get(
     *     path="/mis-ofertas",
     *     summary="Ver mis ofertas",
     *     tags={"Ofertas"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de mis ofertas"
     *     ),
     *     @OA\Response(response=401, description="No autorizado")
     * )
     */

    /**
     * @OA\Get(
     *     path="/tendencias",
     *     summary="Obtener tendencias del mercado",
     *     tags={"Tendencias"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de tendencias"
     *     )
     * )
     */
}
