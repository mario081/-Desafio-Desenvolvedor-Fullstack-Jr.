import { PetType } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateDtoAnimal {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly age: string;

    @IsEnum(PetType, { message: 'type must be DOG or CAT' })
    @IsNotEmpty()
    readonly type: PetType

    @IsString()
    @IsNotEmpty()
    readonly race: string;
    
}