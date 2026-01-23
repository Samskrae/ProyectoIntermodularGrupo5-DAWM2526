# 1. Sincronizar repo
git checkout main
git pull origin main

# 2. Crear rama propia
git checkout -b feature/rama-ejemplo

* Siempre usamos algo descriptivo 

# 3. Trabajar y Comitear
git add .
git commit -m "Añadida validación de formulario de login"
git push origin feature/rama-ejemplo

# 4. Desde GitHub abrir un Pull Request

////////////////////////////////////////////////////////////

## EJEMPLO

## Voy a integrar el login de los usuarios.

## Me sincronizo 
git checkout main
git pull origin main

## Creo mi rama propia 
git checkout -b feature/login-usuario

## Trabajo y cuando acabe la rama...
git add .
git commit -m "Añadida validación de formulario de login"
git push origin feature/login-usuario

