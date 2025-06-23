import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { tareaService } from './tarea.service';

@Controller('tarea')
export class TareaController {
    constructor(private tareaServ: tareaService) {}

    @Post()
    create(@Body() data: { usuarioId: number; descripcion: string; estado: string }) {
        return this.tareaServ.create(data.usuarioId, data.descripcion, data.estado);
    }

    @Get()
    findAll() {
        return this.tareaServ.findAll();
    }

    @Get(':usuarioId')
        async getTareasByUserId(@Param('usuarioId') usuarioId: string) {
        return this.tareaServ.findByUserId(Number(usuarioId));
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.tareaServ.update(+id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tareaServ.delete(+id);
    }

    
}