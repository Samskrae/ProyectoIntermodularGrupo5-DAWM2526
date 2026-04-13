# 📱 ConectorTalento - Portal de Empleo

[![GitHub license](https://img.shields.io/github/license/Samskrae/ProyectoIntermodularGrupo5-DAWM2526)](https://github.com/Samskrae/ProyectoIntermodularGrupo5-DAWM2526/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Samskrae/ProyectoIntermodularGrupo5-DAWM2526)](https://github.com/Samskrae/ProyectoIntermodularGrupo5-DAWM2526)

**ConectorTalento** es una plataforma de empleo intermodular que conecta a alumnos en búsqueda de oportunidades laborales con empresas que buscan talento.

## 🎯 Características Principales

### Para Alumnos
- ✅ Registro y autenticación segura
- ✅ Búsqueda y filtrado de ofertas de empleo
- ✅ Visualización detallada de ofertas
- ✅ Postulación a ofertas con carta de presentación
- ✅ Gestión de postulaciones (estado, retiro)
- ✅ Perfil profesional personalizable
- ✅ Acceso a tendencias del mercado laboral

### Para Empresas
- ✅ Registro y autenticación empresarial
- ✅ Dashboard administrativo completo
- ✅ Crear, editar y eliminar ofertas
- ✅ Gestión de postulaciones recibidas
- ✅ Aceptar/rechazar candidatos
- ✅ Ver estadísticas de ofertas

### General
- ✅ Tendencias tecnológicas en tiempo real
- ✅ Sistema de autenticación Sanctum
- ✅ API RESTful documentada con Swagger
- ✅ Interfaz responsiva y moderna

## 🛠 Tech Stack

### Backend
- **Framework**: Laravel 12
- **PHP**: 8.2+
- **Base de Datos**: MySQL 8.0
- **Autenticación**: Laravel Sanctum
- **API**: RESTful con OpenAPI/Swagger

### Frontend
- **Framework**: Next.js 16
- **React**: 19.2
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React

### DevOps
- **Containerización**: Docker & Docker Compose
- **Node.js**: 20

## 📋 Requisitos

- Docker Desktop 4.0+
- Docker Compose 2.0+
- Git

## 🚀 Inicio Rápido

### 1. Clonar Repositorio

```bash
git clone https://github.com/Samskrae/ProyectoIntermodularGrupo5-DAWM2526.git
cd ProyectoIntermodularGrupo5-DAWM2526
```

### 2. Levantar Contenedores

```bash
docker-compose up -d
```

### 3. Ejecutar Migraciones

```bash
docker-compose exec -T backend php artisan migrate
```

### 4. Crear Datos de Prueba (Opcional)

```bash
docker-compose exec -T backend php artisan db:seed --class=OfertaSeeder
```

### 5. Acceder a la Aplicación

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000/api](http://localhost:8000/api)
- **API Docs**: [http://localhost:8000/api/documentation](http://localhost:8000/api/documentation)

## 📚 Documentación

- [Guía de Deployment](./DEPLOYMENT.md) - Instrucciones para producción
- [API Documentation](http://localhost:8000/api/documentation) - Swagger/OpenAPI
- [Metodología Git](./metodologia-git.md) - Flujo de trabajo

## 🧪 Testing

### Backend Tests

```bash
# Ejecutar todos los tests
docker-compose exec -T backend php artisan test

# Tests específicos
docker-compose exec -T backend php artisan test --filter=AuthenticationTest
docker-compose exec -T backend php artisan test --filter=OfertasTest
docker-compose exec -T backend php artisan test --filter=PostulacionesTest
```

### Cobertura

```bash
docker-compose exec -T backend php artisan test --coverage
```

## 📦 Estructura del Proyecto

```
ProyectoIntermodularGrupo5-DAWM2526/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Models/            # Modelos Eloquent
│   │   ├── Http/Controllers/  # Controladores
│   │   └── Console/Commands/  # Comandos Artisan
│   ├── database/
│   │   ├── migrations/        # Migraciones BD
│   │   └── seeders/           # Seeders
│   ├── routes/
│   │   └── api.php            # Rutas API
│   └── tests/                 # Tests Feature
├── frontend/                  # Next.js App
│   ├── app/
│   │   ├── components/        # Componentes React
│   │   ├── context/           # React Context
│   │   └── dashboard/         # Dashboard Empresa
│   └── public/                # Assets estáticos
├── docker/                    # Configuración Docker
└── docker-compose.yml         # Orquestación
```

## 🔐 Autenticación

El proyecto usa **Laravel Sanctum** para autenticación token-based:

```typescript
// Frontend - Usar AuthContext
import { useAuth } from '@/app/context/AuthContext';

const { user, token, login, logout } = useAuth();
```

## 🌐 API Endpoints

### Autenticación
- `POST /api/register-alumno` - Registrar estudiante
- `POST /login-alumno` - Login estudiante
- `POST /register-empresa` - Registrar empresa
- `POST /login-empresa` - Login empresa
- `POST /logout` - Cerrar sesión

### Ofertas
- `GET /api/ofertas` - Listar todas las ofertas
- `GET /api/ofertas/{id}` - Ver detalle de oferta
- `POST /api/ofertas` - Crear oferta (requiere auth)
- `PUT /api/ofertas/{id}` - Actualizar oferta
- `DELETE /api/ofertas/{id}` - Eliminar oferta
- `GET /api/mis-ofertas` - Mis ofertas (empresa)

### Postulaciones
- `POST /api/postulaciones` - Postularse a oferta
- `GET /api/mis-postulaciones` - Ver mis postulaciones
- `DELETE /api/postulaciones/{id}/retirar` - Retirar postulación
- `PUT /api/postulaciones/{id}/estado` - Cambiar estado

### Tendencias
- `GET /api/tendencias` - Obtener tendencias del mercado

## 💾 Variables de Entorno

### Backend `.env`

```env
APP_NAME=ConectorTalento
APP_ENV=production
APP_DEBUG=false
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=mysql-db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=root

SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

### Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 📊 Base de Datos

### Tablas Principales
- **ALUMNO** - Datos de estudiantes
- **EMPRESA** - Datos de empresas
- **OFERTA_EMPLEO** - Ofertas de trabajo
- **POSTULACION** - Aplicaciones de estudiantes
- **TECNOLOGIA** - Tecnologías/habilidades
- **TENDENCIA_MERCADO** - Tendencias del mercado

## 🔄 Web Scraping

Ejecutar scraping de tendencias:

```bash
docker-compose exec -T backend php artisan trends:scrape
```

Datos scraped desde:
- GitHub API (lenguajes populares)
- Stack Overflow API (tags populares)
- npm Registry (paquetes trendy)

Programar ejecución diaria (Cron):

```bash
0 2 * * * cd /path/to/project && php artisan trends:scrape
```

## 🐛 Troubleshooting

### Puerto en uso

```bash
# Cambiar puertos en docker-compose.yml
# O liberar puerto:
lsof -i :8000
kill -9 <PID>
```

### Conexión BD fallida

```bash
docker-compose logs db
docker-compose restart db
```

### Caché corrupto

```bash
docker-compose exec -T backend php artisan cache:clear
docker-compose exec -T backend php artisan config:clear
```

## 📝 Logs

```bash
# Backend
docker-compose logs -f backend

# Frontend
docker-compose logs -f frontend

# DB
docker-compose logs -f db
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Ver [metodologia-git.md](./metodologia-git.md) para más detalles.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - Ver archivo [LICENSE](LICENSE) para detalles.

## 👥 Equipo

- **Francisco** - Desarrollo Full Stack
- **Coordinador**: Proyecto Intermodular DAWM 2025-2026

## 📞 Soporte

Para reportar bugs o solicitar features:
- [GitHub Issues](https://github.com/Samskrae/ProyectoIntermodularGrupo5-DAWM2526/issues)
- Email: support@conectortalento.com

## 🎓 Proyecto Académico

Proyecto Final del Ciclo Superior de Desarrollo de Aplicaciones Web Multiplataforma (DAWM) - 2025-2026

---

**Última actualización**: Febrero 2026
**Versión**: 1.0.0
