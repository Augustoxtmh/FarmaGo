import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.usuario.createMany({
    data: [
        {
          nombre: 'Admin', email: 'admin@test.com', contraseña: '1234',
          ultimoLogin: new Date()
        },
        {
          nombre: 'Test', email: 'test@test.com', contraseña: 'abcd',
          ultimoLogin: new Date()
        }
    ],
    skipDuplicates: true
  });

  await prisma.tarea.createMany({
    data: [
        { descripcion: 'Hacer documentación', estado: 'pendiente', usuarioId: 1 },
        { descripcion: 'Revisar frontend', estado: 'completada', usuarioId: 1 },
        { descripcion: 'Hacer documentación', estado: 'completada', usuarioId: 2 },
        { descripcion: 'Revisar frontend', estado: 'pendiente', usuarioId: 2 },
        { descripcion: 'Revisar backend', estado: 'completada', usuarioId: 2 }
    ]
  });
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());