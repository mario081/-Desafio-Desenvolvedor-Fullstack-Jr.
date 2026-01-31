import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { JwtUserGuard } from 'src/user/jwt.user.guard';
import { CreateDtoAnimal } from './dto/createDtoAnimal';
import { CurrentUser } from 'src/user/current.user.decorataor';
import { updateAnimalDto } from './dto/updateDtoAnimal';

@Controller('animal')
export class AnimalController {

    constructor(private readonly aninalService: AnimalService) { }

    @Get()
    findAll() {
        return this.aninalService.findAll();
    }

    @Post()
    @UseGuards(JwtUserGuard)
    create(@Body() CreateDtoAnimal: CreateDtoAnimal, @CurrentUser() user: any) {
        return this.aninalService.create(CreateDtoAnimal, user.userId);
    }

    @Patch(":id")
    @UseGuards(JwtUserGuard)
    update(@Param("id") id: string, @Body() updateAnimalDto: updateAnimalDto, @CurrentUser() user: any) {
        return this.aninalService.update(id, updateAnimalDto, user.userId);
    }

    @Delete(":id")
    @UseGuards(JwtUserGuard)
    remover(@Param("id") id: string, @CurrentUser() user: any) {
        return this.aninalService.remover(id, user.userId);
    }
}