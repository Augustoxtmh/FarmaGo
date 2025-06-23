import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Tarea } from '@prisma/client';


@Injectable()
export class tareaService {
    constructor(private prisma: PrismaService){}

    create(usuarioId: number, descripcion: string, estado: string) {
        return this.prisma.tarea.create({
            data: { usuarioId, descripcion, estado }
        });
    }

    findAll() {
        return this.prisma.tarea.findMany();
    }

    findByUserId(usuarioId: number) {
    return this.prisma.tarea.findMany({
        where: { usuarioId }
    });
    }

    update(id: number, data: any) {
        return this.prisma.tarea.update({ where: { id }, data });
    }

    delete(id: number) {
        return this.prisma.tarea.delete({ where: { id } });
    }
}