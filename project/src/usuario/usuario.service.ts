import { PrismaService } from "src/prisma/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Usuario } from '@prisma/client';


@Injectable()
export class UsuarioService {
    constructor(private prisma: PrismaService){}

    async createUsuario(data: Usuario) {
        const existingUser = await this.getUsuarioByEmail(data.email);
        
        data.ultimoLogin = new Date()

        if (!existingUser) {
            return await this.prisma.usuario.create({ data });
        }

        throw new BadRequestException('El email ya está en uso');
    }
  
    async updateUsuario(data: Usuario): Promise<Usuario> {
        return this.prisma.usuario.update({
            where: { id: data.id },
            data,
        });
    }
  
    async getUsuarios(): Promise<Usuario[]> {
        return await this.prisma.usuario.findMany();
    }
  
    async getUsuarioByEmail(email: string): Promise<Usuario> {
        return await this.prisma.usuario.findFirst({
            where: {
                email
            }
        })
    }
    
    async deleteUsuarioById(id: number): Promise<Usuario> {
        return await this.prisma.usuario.delete({
            where: {
                id: id
            },
        });
    } 
}

