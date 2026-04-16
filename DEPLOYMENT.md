# 🚀 Guía de Deployment - ConectorTalento

## Requisitos Previos

- Docker y Docker Compose
- Node.js 20+ (opcional, si no usas Docker)
- PHP 8.2+ (opcional, si no usas Docker)
- MySQL 8.0+
- Git

## Instalación Local (Recomendado con Docker)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Samskrae/ProyectoIntermodularGrupo5-DAWM2526.git
cd ProyectoIntermodularGrupo5-DAWM2526
```

### 2. Configurar Variables de Entorno

#### Backend (.env)

```bash
cd backend
cp .env.example .env
```

Editar `.env`:
```env
APP_NAME="ConectorTalento"
APP_ENV=production
APP_DEBUG=false
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=mysql-db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=root

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SESSION_DOMAIN=localhost

APP_KEY=base64:xxxxx (generar con: php artisan key:generate)
```

#### Frontend (.env.local)

```bash
cd ../frontend
cp .env.example .env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Levantar Contenedores Docker

```bash
cd ..
docker-compose up -d
```

Esto levantará:
- **MySQL** (puerto 3306)
- **Laravel Backend** (puerto 8000)
- **Next.js Frontend** (puerto 3000)

### 4. Ejecutar Migraciones

```bash
docker-compose exec -T backend php artisan migrate
```

### 5. Scrapar Tendencias (Opcional)

```bash
docker-compose exec -T backend php artisan trends:scrape
```

### 6. Crear Datos de Prueba

```bash
docker-compose exec -T backend php artisan db:seed --class=OfertaSeeder
```

## Acceso a la Aplicación

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **API Documentation (Swagger)**: http://localhost:8000/api/documentation

## Deployment a Producción

### Usando Railway.app (Recomendado)

1. **Conectar repositorio**
   ```bash
   railway link
   railway up
   ```

2. **Variables de Entorno en Railway**
   - Configurar todas las variables `.env` en el panel de Railway
   - Incluir `APP_KEY` generada localmente

3. **Ejecutar Migraciones**
   ```bash
   railway run php artisan migrate --force
   ```

### Usando Heroku

1. **Instalar Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Crear aplicación**
   ```bash
   heroku create tu-app-name
   ```

3. **Configurar Buildpacks**
   ```bash
   heroku buildpacks:add heroku/nodejs
   heroku buildpacks:add heroku/php
   ```

4. **Configurar variables**
   ```bash
   heroku config:set APP_ENV=production
   heroku config:set APP_KEY=base64:xxxxx
   heroku config:set DB_CONNECTION=mysql
   # ... etc
   ```

5. **Deploy**
   ```bash
   git push heroku main
   heroku run php artisan migrate --force
   ```

### Usando AWS (EC2 + RDS)

1. **Crear instancia EC2**
   - AMI: Ubuntu 22.04
   - Tipo: t2.micro o superior
   - Security Group: abrir puertos 80, 443, 22

2. **Instalar dependencias**
   ```bash
   sudo apt update
   sudo apt install -y php8.2-cli php8.2-fpm php8.2-mysql \
     nginx nodejs npm git curl zip unzip
   ```

3. **Clonar y configurar**
   ```bash
   git clone https://github.com/Samskrae/ProyectoIntermodularGrupo5-DAWM2526.git
   cd ProyectoIntermodularGrupo5-DAWM2526
   
   # Backend
   cd backend
   composer install --optimize-autoloader --no-dev
   php artisan migrate --force
   php artisan key:generate
   
   # Frontend
   cd ../frontend
   npm install
   npm run build
   ```

4. **Configurar Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       root /var/www/html/public;
       index index.php;

       location / {
           try_files $uri $uri/ /index.php?$query_string;
       }

       location ~ \.php$ {
           fastcgi_pass unix:/run/php/php8.2-fpm.sock;
           fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
           include fastcgi_params;
       }
   }
   ```

5. **Usar SSL (Let's Encrypt)**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Monitoreo y Mantenimiento

### Logs

```bash
# Backend
docker-compose logs -f backend

# Frontend
docker-compose logs -f frontend

# MySQL
docker-compose logs -f db
```

### Backup de Base de Datos

```bash
# Hacer backup
docker-compose exec -T db mysqldump -u root -proot laravel > backup.sql

# Restaurar
docker-compose exec -T db mysql -u root -proot laravel < backup.sql
```

### Actualizar Tendencias (Cron Job)

```bash
# En producción, ejecutar diariamente
0 2 * * * /usr/bin/php /var/www/html/artisan trends:scrape >> /var/log/trends-scrape.log 2>&1
```

## Troubleshooting

### Error de Conexión a BD

```bash
# Verificar que MySQL está corriendo
docker-compose ps

# Revisar logs
docker-compose logs db
```

### Port Already in Use

```bash
# Cambiar puertos en docker-compose.yml
# O liberar puertos:
sudo lsof -i :8000  # Encontrar proceso
kill -9 <PID>       # Matar proceso
```

### Swagger No Funciona

```bash
docker-compose exec -T backend php artisan l5-swagger:generate
```

## Variables de Entorno Completas

### Backend (.env)

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

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@conectortalento.com

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

SANCTUM_STATEFUL_DOMAINS=localhost:3000,yourdomain.com
SESSION_DOMAIN=localhost
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=ConectorTalento
```

## Performance Tips

1. **Habilitar Caching de Ofertas**
   ```bash
   docker-compose exec -T backend php artisan cache:clear
   ```

2. **Optimizar Base de Datos**
   ```sql
   ALTER TABLE OFERTA_EMPLEO ADD INDEX (empresa_id);
   ALTER TABLE OFERTA_EMPLEO ADD INDEX (estado);
   ALTER TABLE POSTULACION ADD INDEX (alumno_id);
   ALTER TABLE POSTULACION ADD INDEX (oferta_id);
   ```

3. **Comprimir Assets**
   ```bash
   cd frontend
   npm run build  # Ya hace optimización
   ```

4. **Usar CDN** para imágenes y assets estáticos

## Soporte

Para más información o reportar issues:
- GitHub Issues: https://github.com/Samskrae/ProyectoIntermodularGrupo5-DAWM2526/issues
- Email: support@conectortalento.com
