import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TareaModule } from './tarea/tarea.modulle';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UsuarioModule, TareaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
