import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TareaController } from './tarea.controller';
import { tareaService } from './tarea.service';

@Module({
    imports: [PrismaModule],
    controllers: [TareaController],
    providers: [tareaService],
})
export class TareaModule {}