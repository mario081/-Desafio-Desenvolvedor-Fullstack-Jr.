import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDtoAnimal } from './dto/createDtoAnimal';
import { NotFoundError } from 'rxjs';
import { updateAnimalDto } from './dto/updateDtoAnimal';

@Injectable()
export class AnimalService {

   constructor(private readonly prisma: PrismaService) { }

   async findAll() {
      return await this.prisma.announcement.findMany({
         include: {
            user: {
               select: {
                  name: true,
                  contact: true
               }
            }
         }
      });
   }

   async findOne(id: string) {
      return await this.prisma.announcement.findUnique({
         where: { id }
      })
   }

   async create(createAnimalDto: CreateDtoAnimal, userId: string) {
      return await this.prisma.announcement.create({
         data: {
            name: createAnimalDto.name,
            age: createAnimalDto.age,
            type: createAnimalDto.type,
            race: createAnimalDto.race,

            user: {
               connect: { id: userId }
            }
         }
      })
   }

   async update(id: string, updateAnimalDto: updateAnimalDto, userId: string) {
      const animalIndex = await this.prisma.announcement.findUnique({
         where: {id}
      })

      if(!animalIndex) throw new NotFoundException('Animal not found');

      if(animalIndex.userId !== userId) throw new ForbiddenException('You are not allowed to update this animal');

      const updateAnimal = await this.prisma.announcement.update({
         where: {id},
         data: {
            ...updateAnimalDto
         }
      })

      return updateAnimal
   }

   async remover(id: string, userId: string) {
      const animalIndex = await this.prisma.announcement.findUnique({
         where: {id}
      })

      if(!animalIndex) throw new NotFoundException('Animal not found');

      if(animalIndex.userId !== userId) throw new ForbiddenException('You are not allowed to delete this animal');

      const removeAnimal = await this.prisma.announcement.delete({
         where: {id}
      })

      return removeAnimal;

   }


}
