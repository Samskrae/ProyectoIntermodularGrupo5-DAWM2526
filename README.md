# 📱 ConectorTalento | Portal de Empleo Intermodular

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](#)
[![Laravel](https://img.shields.io/badge/Backend-Laravel_12-FF2D20?logo=laravel)](https://laravel.com)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js_16-000000?logo=next.js)](https://nextjs.org)

**ConectorTalento** es una plataforma integral diseñada para conectar el ecosistema académico con el mercado laboral, permitiendo a los alumnos gestionar su futuro profesional y a las empresas localizar el mejor talento joven.

---

## 🏛️ Arquitectura y Tech Stack

El proyecto se basa en una arquitectura desacoplada y containerizada para garantizar la paridad entre entornos de desarrollo y producción.

### **Backend (API Core)**
* **Framework:** Laravel 12 (PHP 8.2+).
* **Autenticación:** Laravel Sanctum (Token-based).
* **Base de Datos:** MySQL 8.0.
* **Documentación:** OpenAPI / Swagger.

### **Frontend (Client)**
* **Framework:** Next.js 16 (App Router) + TypeScript.
* **UI/UX:** Tailwind CSS 4 & Framer Motion.
* **Iconografía:** Lucide React.

### **Infraestructura & DevOps**
* **Containerización:** Docker & Docker Compose.
* **Web Scraping:** Servicio automatizado para análisis de tendencias (GitHub, StackOverflow, NPM).

---

## 🚀 Inicio Rápido (Despliegue Local)

Siga estos pasos para levantar el entorno completo utilizando Docker.

### 1. Clonación del Repositorio
```bash
git clone https://github.com/Samskrae/ProyectoIntermodularGrupo5-DAWM2526.git
cd ProyectoIntermodularGrupo5-DAWM2526
```

### 2. Despliegue Inicial
```bash
# Construir e iniciar contenedores en segundo plano
docker-compose up -d --build
```

### 3. Despliegue Backend
# Generar clave de aplicación y ejecutar migraciones con datos de prueba
```bash
docker-compose exec -T backend php artisan key:generate
docker-compose exec -T backend php artisan migrate --seed
```
# En caso de necesitar limpiar la caché de rutas o configuración
```bash
docker-compose exec -T backend php artisan optimize:clear
```

### 4. Despliegue de Frontend (Parte Opcional)
# Opcional: Reparar vulnerabilidades de dependencias si es necesario
```bash
docker-compose exec -T frontend npm audit fix --force
```
# En caso de errores visuales o de compilación, limpiar la caché de Next.js
```bash
docker-compose exec -T next-frontend rm -rf .next
```

## 👥 Equipo de Desarrollo

El proyecto **ConectorTalento** ha sido desarrollado por los integrantes del **Grupo 5** del Ciclo Superior de Desarrollo de Aplicaciones Web (DAW) - Promoción 2025/2026:

* **Roberto Rodriguez Martinez**
* **Francisco Viera Hernandez**
* **Jose Santiago Gordillo Santana**
* **Arian Santana López**

---

> [!IMPORTANT]
> **Aviso Académico:** Este proyecto ha sido desarrollado como parte del Proyecto Intermodular. Todos los derechos de propiedad intelectual pertenecen a los autores mencionados anteriormente.

**© 2026 ConectorTalento Project. All rights reserved.**