# 🚀 Conector Talento-Empresa - Estado del Proyecto

## ✅ Completado

### Backend (Laravel API)
- ✅ Docker container configurado y ejecutándose
- ✅ Base de datos MySQL con 9 tablas relacionadas
- ✅ Modelos Eloquent con relaciones correctas:
  - `Empresa`, `OfertaEmpleo`, `Alumno`, `Postulacion`, `Tecnologia`, `PerfilProfesional`, `TendenciaMercado`
- ✅ Controllers CRUD para todas las entidades
- ✅ API REST completa en `/api` con rutas RESTful
- ✅ Datos de prueba insertados:
  - 4 empresas
  - 8+ ofertas de empleo
  - 8 tecnologías con demanda
  - 8 tendencias del mercado

### Frontend (Next.js + React)
- ✅ Docker container configurado y ejecutándose
- ✅ Navegación responsive con menu móvil
- ✅ Página Home con hero section, features, stats, CTA
- ✅ Página Ofertas con búsqueda, filtros, y conexión al API
- ✅ Página Tendencias con gráficos (recharts) de demanda
- ✅ Página Autenticación con login/registro
- ✅ Página Perfil con datos del usuario
- ✅ Página Registro de Empresa con formulario multietapa

### Dependencias Instaladas
- ✅ Framer Motion (animaciones)
- ✅ Recharts (gráficos de datos)
- ✅ Lucide React (iconos)
- ✅ Next.js App Router (enrutamiento)

## 🔧 Tecnología Stack

**Backend:**
- Laravel 12
- PHP 8.2-FPM
- MySQL 8.0
- Eloquent ORM

**Frontend:**
- Next.js 16.1.4
- React 19.2.3
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Recharts

**Infrastructure:**
- Docker Compose
- 3 servicios: backend, frontend, mysql

## 🌐 URLs Accesibles

| Servicio | URL | Puerto |
|----------|-----|--------|
| Frontend | http://localhost:3000 | 3000 |
| Backend API | http://localhost:8000/api | 8000 |
| MySQL | localhost | 3306 |

## 📚 Endpoints API Disponibles

### Empresas
- `GET /api/empresas` - Listar todas las empresas
- `POST /api/empresas` - Crear nueva empresa
- `GET /api/empresas/{id}` - Obtener empresa
- `PUT /api/empresas/{id}` - Actualizar empresa
- `DELETE /api/empresas/{id}` - Eliminar empresa

### Ofertas de Empleo
- `GET /api/ofertas` - Listar todas las ofertas (con empresa y tecnologías)
- `POST /api/ofertas` - Crear nueva oferta
- `GET /api/ofertas/{id}` - Obtener oferta
- `PUT /api/ofertas/{id}` - Actualizar oferta
- `DELETE /api/ofertas/{id}` - Eliminar oferta

### Tendencias del Mercado
- `GET /api/tendencias` - Listar tendencias (con tecnología relacionada)
- `POST /api/tendencias` - Crear nueva tendencia

### Alumnos
- `GET /api/alumnos` - Listar alumnos
- `POST /api/alumnos` - Crear alumno
- `GET /api/alumnos/{id}` - Obtener alumno
- `PUT /api/alumnos/{id}` - Actualizar alumno

### Postulaciones
- `GET /api/postulaciones` - Listar postulaciones
- `POST /api/postulaciones` - Crear postulación

## 🎨 Componentes Frontend

### Páginas Implementadas
1. **Home** (`/`)
   - Hero con gradiente animado
   - 3 feature cards
   - Stats section
   - CTA buttons

2. **Ofertas** (`/ofertas`)
   - Búsqueda en tiempo real
   - Filtros por tipo de contrato
   - Cards de ofertas con tecnologías
   - Datos desde API

3. **Tendencias** (`/tendencias`)
   - Gráfico de barras (demanda por tecnología)
   - Gráfico de pastel (distribución)
   - Cards con barra de progreso
   - Insights clave

4. **Autenticación** (`/auth`)
   - Tabs para login/registro
   - Formulario con validación
   - Integración API

5. **Perfil** (`/perfil`)
   - Info del usuario
   - Edición de datos
   - Logout button

6. **Registro Empresa** (`/registro-empresa`)
   - Formulario multietapa (3 pasos)
   - Validación completa
   - Integración API

### Componentes Compartidos
- **Navigation** - Navbar responsive con hamburger menu

## 📊 Estructura de Base de Datos

```
EMPRESA (4 registros de prueba)
├─ OFERTA_EMPLEO (8+ ofertas)
│  └─ OFERTA_TECNOLOGIA (relación N:M)
│     └─ TECNOLOGIA
└─ POSTULACION
   └─ ALUMNO

ALUMNO
├─ PERFIL_PROFESIONAL
│  └─ PERFIL_TECNOLOGIA (relación N:M)
│     └─ TECNOLOGIA

TENDENCIA_MERCADO
└─ TECNOLOGIA
```

## 🚀 Cómo Ejecutar

### Iniciar los servicios
```bash
cd ProyectoIntermodularGrupo5-DAWM2526
docker-compose up -d
```

### Acceder a la aplicación
- Frontend: http://localhost:3000
- API: http://localhost:8000/api
- MySQL: usuario: `laravel`, password: `secret`

## ⚡ Funcionalidades Implementadas

✅ Visualización de ofertas de empleo con búsqueda y filtrado
✅ Dashboard de tendencias del mercado con gráficos
✅ Autenticación de usuarios (frontend)
✅ Perfil de usuario editable
✅ Registro de empresas con validación
✅ Diseño responsive (mobile-first)
✅ Animaciones suaves (Framer Motion)
✅ Datos en tiempo real desde API

## 🔜 Próximas Mejoras Sugeridas

- [ ] Implementar autenticación backend (Laravel Sanctum)
- [ ] Agregar sistema de postulaciones (crear/listar/actualizar)
- [ ] Integrar web scraping real para tendencias
- [ ] Implementar sistema de favoritos
- [ ] Dashboard admin para empresas
- [ ] Notificaciones en tiempo real
- [ ] Tests automatizados
- [ ] Deployment a producción

## 📝 Notas

- Todos los datos son de prueba/demostración
- La autenticación frontend está lista, necesita integración backend
- Las migraciones se ejecutan automáticamente al iniciar Docker
- El API responde en JSON con data envelope
- Las imágenes de empresas/usuarios pueden agregarse después

---

**Estado:** ✅ MVP Completado y Funcional
**Fecha:** 2 de Febrero de 2026
**Versión:** 1.0
