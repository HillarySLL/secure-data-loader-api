# Secure Data Loader API

![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)
![Versión](https://img.shields.io/badge/versión-1.0.0-green.svg)

`secure-data-loader-api` es el backend de una aplicación que proporciona autenticación de usuarios, procesamiento de archivos CSV, y gestión de datos con migraciones de base de datos usando Umzug.


## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Características](#caracteristicas)
- [Producción](producción)
## Instalación

### Prerrequisitos

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Pasos

1. Clona el repositorio:

    ```bash
    git clone https://github.com/HillarySLL/secure-data-loader-api.git
    cd secure-data-loader-api
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura las variables de entorno:

    Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

    ```env
    PGHOST= Localhost donde se ta ejecutando.
    PGDATABASE= Nombre de la base de datos.
    PGPORT= Puerto.
    PGUSER= Usuario de la base de datos.
    PGPASSWORD= Contraseña de la base de datos.
    CLIENT_ORIGIN= Origen del cliente para configurar CORS.
    MIGRATIONS_FILE= Archivo adicional para almacenar las migraciones.
    ```

4. Ejecuta las migraciones:

    ```bash
    npm run db:create
    npm run db:migrate up
    ```

## Uso

### Desarrollo

Para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
```

Para agregar un usuario de prueba con email `admin@example.com` y password `admin`, ejcutar el siguiente comando:

```bash
npm run db:seed
```

## Caracteristicas

- Autenticación: Sistema de inicio de sesión seguro.
- Procesamiento de CSV: Carga y validación de archivos CSV.
- Base de Datos: Conexión y gestión de datos usando PostgreSQL y Umzug para las migraciones.
- API REST: Endpoints para CRUD de usuarios y gestión de archivos.

## Producción
https://secure-data-loader-api.onrender.com
