# 🚀 Guía de Configuración: Stack Fullstack
## Laravel + Next.js

Este documento detalla el proceso de instalación, configuración del entorno y resolución de problemas para el despliegue del proyecto utilizando **Docker**.

---

## 🛠️ 1. Requisitos Previos
Es necesario instalar las siguientes herramientas en tu sistema local antes de comenzar:

* **Git:** Descargar y ejecutar el instalador. *(Se recomienda reiniciar la terminal tras la instalación)*.
* **Docker Desktop:** Descargar y ejecutar. *(Requiere reinicio del sistema)*.
* **Node.js:** Necesario para la inicialización del frontend con Next.js.
* **Composer:** Necesario para la creación del proyecto Laravel.

---

## 🧩 2. Extensiones Recomendadas (VS Code)
Para optimizar el flujo de trabajo, se recomienda la instalación de los siguientes paquetes:

### #### Categoría: Generales
* **EditorConfig for VS Code:** Mantiene estilos de codificación consistentes.
* **Prettier - Code formatter:** Formatea el código automáticamente.
* **ESLint:** Analiza el código en busca de errores de sintaxis.
* **DotENV:** Coloreado de sintaxis para archivos `.env`.

### #### Categoría: Docker
* **Docker (Microsoft):** Facilita la gestión de contenedores, imágenes y archivos `Dockerfile`.

### #### Categoría: Backend (PHP & Laravel)
* **PHP Intelephense:** El mejor motor de autocompletado y sugerencias para PHP.
* **Laravel Extra Intellisense:** Autocompletado para rutas, vistas, configuraciones y traducciones.
* **Laravel Blade Snippets:** Atajos y resaltado de sintaxis para plantillas Blade.
* **PHP Namespace Resolver:** Importa clases y resuelve espacios de nombres automáticamente.

### #### Categoría: Frontend (JS & TS)
* **JavaScript and TypeScript Nightly:** Soporte avanzado para las últimas funciones de JS/TS.
* **ES7+ React/Redux/React-Native snippets:** Atajos de teclado para crear componentes rápidamente.
* **Tailwind CSS IntelliSense:** Autocompletado y vista previa de clases de Tailwind.

### #### Categoría: Control de Versiones
* **GitLens:** Superpoderes para Git; permite ver quién hizo cada cambio línea por línea.

---

## 📂 3. Estructura del Proyecto
La organización de archivos se define de la siguiente manera:

```text
mi-proyecto/
├── backend/            # Aplicación Laravel
├── frontend/           # Aplicación Next.js
├── docker/             # Configuraciones de infraestructura
│   ├── nginx/
│   ├── php/
│   └── mysql/
├── docker-compose.yml  # Orquestación de contenedores
└── README.md
```

#### Paso A: Creación del Backend (Laravel)

Desde la raíz del proyecto, ejecuta:
- Bash

composer create-project laravel/laravel backend

Verifica la instalación:
- Bash

- cd backend
- php artisan --version

#### Paso B: Creación del Frontend (Next.js)

Desde la raíz del proyecto, ejecuta:
- Bash

- npx create-next-app@latest frontend

- TIP: Solución a errores de directiva en PowerShell: Si recibes un error de permisos, abre PowerShell como Administrador y ejecuta: Set-ExecutionPolicy RemoteSigned.

Una vez configurados los archivos docker-compose.yml y los Dockerfile correspondientes:
#### Iniciar contenedores
Bash

- docker-compose up -d --build

Nota: Si ocurre un error de versión de WSL, ejecuta wsl --update en el CMD.
#### Configuración interna del Backend

Accede al contenedor para levantar el servicio y generar las claves necesarias:

Entrar al contenedor:

- Bash
- docker exec -it laravel-backend bash

Dentro del contenedor:
- Bash

- php artisan key:generate
- php artisan migrate
- php artisan serve --host=0.0.0.0 --port=8000

#### ❌ Error con node_modules (Conflictos de Host)

Si el frontend presenta errores de importación debido a la persistencia de módulos del host:

Elimina manualmente las carpetas .next y node_modules dentro de /frontend.

Limpia los volúmenes de Docker:
- Bash

- docker-compose down -v
- docker-compose up -d --build

#### ❌ Error en Rutas de Laravel

Si las rutas no responden correctamente tras la primera build:

Se realizó un reajuste en el archivo docker-compose.yml, seguido de una limpieza y reconstrucción total del entorno.

#### ❌ Error de Conexión a Base de Datos (.env)

Si el backend no conecta con MySQL a pesar de estar en Docker:

Asegúrate de ejecutar las migraciones dentro del contenedor.

Verifica que los parámetros del .env coincidan con los definidos en el servicio mysql del docker-compose.yml.