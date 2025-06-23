Documentación Prueba Técnica

Funcionalidades principales:

Gestión de usuarios (creación, consulta, actualización, eliminación)
Visualización de tareas por usuario
Visualización de horas actuales en distintos países

Tecnologías utilizadas
Backend: NestJS, Prisma ORM, PostgreSQL (u otra base configurada)

Frontend: Angular

Otros: TypeScript, Node.js

Cómo correr el proyecto
Backend:
  Clonar repositorio

  Crear una base de datos en pgAdmin llamandola farmaGo

  Instalar dependencias:
    npm install
    Configurar archivo .env con datos de conexión a la base de datos (renombrar el .env.example a .env)
  
  Ejecutar migraciones y seed:
    npx prisma migrate dev
    npx prisma db seed
  
  Iniciar servidor:
    npm run start

Frontend
  Navegar a la carpeta del frontend
  
  Instalar dependencias:
    npm install
  
  Iniciar servidor de desarrollo:
    ng serve
    Acceder a http://localhost:4200
