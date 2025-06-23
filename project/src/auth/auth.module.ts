import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [PrismaModule, UsuarioModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}