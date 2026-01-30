import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./createUserDto";

// extende o CreateUserDto, porem todas as propriedades sao opcionais
export class updateUserDto extends PartialType(CreateUserDto) {}