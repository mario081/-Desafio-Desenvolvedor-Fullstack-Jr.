import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { updateUserDto } from './dto/updateDtoUser';
import { signInUserDto } from './dto/signInUserDto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.userService.findbyId(id);
    }

    @Get("email/:email")
    findByEmail(@Param("email") email: string,) {
        return this.userService.findByEmail(email);
    }

    @Post()
    create(@Body() createDto: CreateUserDto) {
        return this.userService.create(createDto);
    }

    @Post("signin")
    signIn(@Body() creatDto: signInUserDto) {
        return this.userService.signIn(creatDto);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateUserDto: updateUserDto) {
        return this.userService.update(id, updateUserDto)
    }

    @Delete(":id")
    remove(@Param("id") id: string){
        return this.userService.revome(id)
    }
}

/*
@Get("email/:email")
findByEmail(@Param("email") email: string): string | any {
    return this.userService.findByEmail(email);
}

@Post()
create(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto);
}

@Patch(":id")
update(@Param("id") id: string, @Body() updateDto: updateUserDto): string | any {
    return this.userService.update(id, updateDto);
}

@Delete(":id")
remove(@Param("id") id: string): string | any {
    return this.userService.remove(id);
} */
