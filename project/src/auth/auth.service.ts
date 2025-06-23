import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService) {}

  async validateUser(email: string, contra: string): Promise<any> {
    const usuario: Usuario = await this.usuarioService.getUsuarioByEmail(email);
    if (usuario && (contra == usuario.contraseña)) {     
      await this.usuarioService.updateUsuario({
        ...usuario,
        ultimoLogin: new Date()
      });

      return usuario.id;
    }
    throw new UnauthorizedException('Credenciales invalidas');
  }
}