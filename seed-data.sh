#!/bin/bash

# Script para insertar datos de prueba en la base de datos

# Esperar a que la base de datos esté lista
sleep 10

# Conectar a MySQL e insertar empresas de prueba
docker exec -i mysql-db mysql -u laravel -psecret laravel << EOF

-- Empresas
INSERT INTO EMPRESA (nombre_comercial, razon_social, nit, sector, contacto, telefono, pais, ciudad, direccion, website) VALUES
('Tech Solutions', 'Tech Solutions S.A.', '900123456', 'Software', 'contacto@techsol.com', '+57-1-2345678', 'Colombia', 'Bogotá', 'Cra 7 #45-67', 'www.techsolutions.com'),
('Digital First', 'Digital First Ltda', '900654321', 'Tecnología', 'hola@digitalfirst.com', '+57-1-9876543', 'Colombia', 'Medellín', 'Cra 50 #12-34', 'www.digitalfirst.com'),
('CloudApp Systems', 'CloudApp Systems Inc', '900789456', 'Software', 'info@cloudapp.com', '+57-1-5555555', 'Colombia', 'Cali', 'Av. 6 #45-89', 'www.cloudapp.com'),
('WebDev Pro', 'WebDev Pro S.A.', '900456789', 'Diseño Web', 'contact@webdevpro.com', '+57-1-7777777', 'Colombia', 'Bogotá', 'Cra 15 #23-45', 'www.webdevpro.com');

-- Ofertas de empleo
INSERT INTO OFERTA_EMPLEO (titulo, descripcion, ubicacion, salario_minimo, salario_maximo, tipo_contrato, fecha_publicacion, empresa_id) VALUES
('Desarrollador Senior PHP', 'Se busca developer con experiencia en Laravel y bases de datos', 'Bogotá, Colombia', 4000000, 6000000, 'Tiempo Completo', '2026-02-02', 1),
('Frontend Developer React', 'Necesitamos un frontend developer con experiencia en React y TypeScript', 'Medellín, Colombia', 3500000, 5500000, 'Tiempo Completo', '2026-02-01', 2),
('DevOps Engineer', 'Buscamos DevOps con experiencia en Docker, Kubernetes y AWS', 'Bogotá, Colombia', 5000000, 7000000, 'Tiempo Completo', '2026-02-02', 3),
('Diseñador UI/UX', 'Diseñador creativo con experiencia en Figma y prototipado', 'Cali, Colombia', 2500000, 4000000, 'Tiempo Completo', '2026-01-31', 4),
('Junior Python Developer', 'Desarrollador junior con conocimientos en Python y Django', 'Bogotá, Colombia', 2000000, 3200000, 'Prácticas', '2026-02-02', 1),
('Especialista en Bases de Datos', 'DBA con experiencia en MySQL, PostgreSQL y optimización', 'Medellín, Colombia', 4200000, 5800000, 'Tiempo Completo', '2026-02-01', 2);

-- Tecnologías
INSERT INTO TECNOLOGIA (nombre, categoria, demanda_relativa, tendencia, descripcion) VALUES
('PHP', 'Backend', 85, 'Estable', 'Lenguaje server-side ampliamente utilizado'),
('Laravel', 'Framework', 90, 'En Crecimiento', 'Framework PHP moderno y robusto'),
('React', 'Frontend', 95, 'En Crecimiento', 'Librería JavaScript para interfaces'),
('TypeScript', 'Lenguaje', 88, 'En Crecimiento', 'JavaScript tipado y seguro'),
('Docker', 'DevOps', 92, 'En Crecimiento', 'Contenedorización de aplicaciones'),
('Kubernetes', 'DevOps', 85, 'En Crecimiento', 'Orquestación de contenedores'),
('MySQL', 'Base de Datos', 82, 'Estable', 'Base de datos relacional'),
('Python', 'Backend', 94, 'En Crecimiento', 'Lenguaje versátil y poderoso'),
('AWS', 'Cloud', 93, 'En Crecimiento', 'Plataforma de servicios en la nube'),
('Git', 'Control de Versiones', 98, 'Estable', 'Sistema de control de versiones');

-- Relaciones OFERTA_TECNOLOGIA
INSERT INTO OFERTA_TECNOLOGIA (oferta_id, tecnologia_id) VALUES
(1, 1), (1, 2), (1, 7),
(2, 3), (2, 4), (2, 10),
(3, 5), (3, 6), (3, 9),
(4, 3), (4, 4),
(5, 8), (5, 10),
(6, 7), (6, 9);

EOF

echo "✅ Datos de prueba insertados correctamente"
