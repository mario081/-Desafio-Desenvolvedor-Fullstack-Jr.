import { PartialType } from "@nestjs/mapped-types";
import { CreateDtoAnimal } from "./createDtoAnimal";

// extende o CreateUserDto, porem todas as propriedades sao opcionais
export class updateAnimalDto extends PartialType(CreateDtoAnimal) {}