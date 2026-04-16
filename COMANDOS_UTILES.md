# ⚡ Comandos Útiles - Referencia Rápida

## 🚀 Inicio y Parada de Servicios

### Iniciar servicios
```bash
cd ProyectoIntermodularGrupo5-DAWM2526
docker-compose up -d
```

### Detener servicios
```bash
docker-compose down
```

### Reiniciar servicios
```bash
docker-compose restart
```

### Ver estado
```bash
docker-compose ps
```

---

## 📊 Logs y Debugging

### Ver logs en tiempo real
```bash
# Frontend
docker logs next-frontend -f

# Backend
docker logs laravel-backend -f

# Base de datos
docker logs mysql-db -f
```

### Ver último evento
```bash
docker compose events
```

---

## 🗄️ Base de Datos

### Conectar a MySQL
```bash
docker exec -it mysql-db mysql -u laravel -psecret laravel
```

### Ver todas las tablas
```bash
docker exec mysql-db mysql -u laravel -psecret laravel -e "SHOW TABLES;"
```

### Ver estructura de tabla
```bash
docker exec mysql-db mysql -u laravel -psecret laravel -e "DESCRIBE EMPRESA;"
```

### Ver cantidad de registros
```bash
docker exec mysql-db mysql -u laravel -psecret laravel -e "SELECT COUNT(*) FROM EMPRESA;"
```

### Vaciar una tabla
```bash
docker exec mysql-db mysql -u laravel -psecret laravel -e "DELETE FROM EMPRESA;"
```

### Respaldar base de datos
```bash
docker exec mysql-db mysqldump -u laravel -psecret laravel > backup.sql
```

### Restaurar base de datos
```bash
docker exec -i mysql-db mysql -u laravel -psecret laravel < backup.sql
```

---

## 🌐 API Testing

### Obtener todas las empresas
```bash
curl http://localhost:8000/api/empresas
```

### Obtener todas las ofertas
```bash
curl http://localhost:8000/api/ofertas
```

### Obtener tendencias
```bash
curl http://localhost:8000/api/tendencias
```

### Crear empresa
```bash
curl -X POST http://localhost:8000/api/empresas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_comercial": "Mi Empresa",
    "sector": "Tecnología",
    "contacto": "contacto@empresa.com"
  }'
```

### Obtener empresa específica
```bash
curl http://localhost:8000/api/empresas/1
```

### Actualizar empresa
```bash
curl -X PUT http://localhost:8000/api/empresas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_comercial": "Nombre Actualizado"
  }'
```

### Eliminar empresa
```bash
curl -X DELETE http://localhost:8000/api/empresas/1
```

---

## 🔨 Comandos Laravel (Backend)

### Conectar al contenedor
```bash
docker exec -it laravel-backend bash
```

### Ejecutar migraciones
```bash
docker exec laravel-backend php artisan migrate --force
```

### Revertir migraciones
```bash
docker exec laravel-backend php artisan migrate:rollback
```

### Limpiar caché
```bash
docker exec laravel-backend php artisan cache:clear
```

### Generar clave APP
```bash
docker exec laravel-backend php artisan key:generate
```

### Ver rutas
```bash
docker exec laravel-backend php artisan route:list
```

### Crear migración
```bash
docker exec laravel-backend php artisan make:migration create_table_name
```

### Crear modelo
```bash
docker exec laravel-backend php artisan make:model ModelName
```

### Crear controller
```bash
docker exec laravel-backend php artisan make:controller ControllerName --resource
```

---

## 📦 Comandos Node (Frontend)

### Conectar al contenedor
```bash
docker exec -it next-frontend bash
```

### Instalar dependencias
```bash
docker exec next-frontend npm install
```

### Agregar paquete
```bash
docker exec next-frontend npm install nombre-paquete
```

### Remover paquete
```bash
docker exec next-frontend npm uninstall nombre-paquete
```

### Ver versión de Node
```bash
docker exec next-frontend node --version
```

### Ver versión de npm
```bash
docker exec next-frontend npm --version
```

### Listar dependencias
```bash
docker exec next-frontend npm list
```

### Ver outdated packages
```bash
docker exec next-frontend npm outdated
```

### Actualizar dependencias
```bash
docker exec next-frontend npm update
```

---

## 🐳 Docker (General)

### Ver todas las imágenes
```bash
docker images
```

### Ver todos los contenedores
```bash
docker ps -a
```

### Ver espacio utilizado
```bash
docker system df
```

### Limpiar imágenes sin usar
```bash
docker image prune
```

### Limpiar contenedores sin usar
```bash
docker container prune
```

### Limpiar todo
```bash
docker system prune -a
```

### Ver información del contenedor
```bash
docker inspect next-frontend
```

---

## 🔍 Verificación de Conectividad

### Verificar frontend
```bash
curl http://localhost:3000
```

### Verificar backend
```bash
curl http://localhost:8000/api
```

### Verificar base de datos
```bash
docker exec mysql-db mysqladmin -u laravel -psecret ping
```

### Verificar red
```bash
docker network ls
```

### Inspeccionar red
```bash
docker network inspect nombre-network
```

---

## 📝 Insertar Datos de Prueba

### Insertar empresa rápida
```bash
@"
INSERT INTO EMPRESA (nombre_comercial, sector, contacto) VALUES
('Test Company', 'IT', 'test@company.com');
"@ | docker exec -i mysql-db mysql -u laravel -psecret laravel
```

### Insertar múltiples ofertas
```bash
@"
INSERT INTO OFERTA_EMPLEO (titulo, descripcion, requisitos, empresa_id) VALUES
('Dev Senior', 'Se busca dev', '2+ años', 1),
('Frontend Jr', 'React/Vue', '1+ año', 2),
('DevOps', 'Docker', '3+ años', 3);
"@ | docker exec -i mysql-db mysql -u laravel -psecret laravel
```

---

## 🚨 Solución de Problemas

### Puerto en uso
```bash
# Cambiar puerto en docker-compose.yml y reiniciar
docker-compose down
docker-compose up -d
```

### Contenedor no inicia
```bash
docker logs nombre-contenedor
docker-compose logs --tail=50
```

### Conexión rechazada
```bash
# Verificar que los servicios están corriendo
docker-compose ps

# Reiniciar todo
docker-compose down -v
docker-compose up -d
```

### Migraciones fallan
```bash
docker exec laravel-backend php artisan migrate:reset
docker exec laravel-backend php artisan migrate --force
```

### Permisos denegados
```bash
# En Windows, usar: wsl --shutdown
# En Linux: sudo chown -R $USER:$USER .
```

---

## 📊 Monitoreo Avanzado

### CPU y memoria
```bash
docker stats
```

### Ver procesos en contenedor
```bash
docker top laravel-backend
```

### Inspeccionar red del contenedor
```bash
docker exec next-frontend ip addr show
```

### Ver eventos Docker
```bash
docker events --since 10m
```

---

## 🔐 Acceso a Datos Sensibles

### Ver variables de entorno backend
```bash
docker exec laravel-backend env
```

### Ver variables de entorno frontend
```bash
docker exec next-frontend env
```

### Verificar .env
```bash
docker exec laravel-backend cat /app/.env | grep DB_
```

---

## 💾 Backup y Restauración

### Backup completo
```bash
docker-compose exec -T mysql-db mysqldump -u laravel -psecret laravel > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restaurar backup
```bash
docker-compose exec -T mysql-db mysql -u laravel -psecret laravel < backup_20260202_100000.sql
```

### Exportar datos a CSV
```bash
docker exec mysql-db mysql -u laravel -psecret laravel -e "SELECT * FROM EMPRESA;" > empresas.csv
```

---

## 🚀 Deploy (Preparación)

### Build imagen frontend
```bash
docker build -t conector-frontend:1.0 ./frontend
```

### Build imagen backend
```bash
docker build -t conector-backend:1.0 ./backend
```

### Push a registro
```bash
docker tag conector-frontend:1.0 usuario/conector-frontend:1.0
docker push usuario/conector-frontend:1.0
```

---

## 📱 Pruebas en Diferentes Dispositivos

### Acceder desde otra máquina
```
http://[IP-DEL-HOST]:3000
http://[IP-DEL-HOST]:8000/api
```

### Ver IP local
```bash
ipconfig getifaddr en0  # Mac
hostname -I             # Linux
ipconfig                # Windows (buscar IPv4)
```

### Acceder desde móvil en red local
```
http://192.168.x.x:3000
```

---

## 💡 Tips Útiles

### Ejecutar comando sin entrar al contenedor
```bash
docker exec laravel-backend php artisan tinker
```

### Ver historial de comandos docker
```bash
history | grep docker
```

### Crear alias para comandos largos
```bash
alias backend='docker exec -it laravel-backend'
alias mysql='docker exec -it mysql-db mysql -u laravel -psecret laravel'
alias frontend='docker exec -it next-frontend'

# Uso:
backend php artisan migrate
```

### Pipe entre contenedores
```bash
docker exec laravel-backend php artisan seed | grep -i "inserted"
```

### Ver tamaño del contenedor
```bash
docker ps --size
```

---

**Última actualización**: 2 de Febrero de 2026

Estos comandos te ayudarán a administrar, debuggear y optimizar el proyecto en todo momento. ¡Mantén este archivo a mano! 📌
