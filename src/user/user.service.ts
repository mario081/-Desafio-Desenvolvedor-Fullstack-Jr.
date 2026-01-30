import { CreateUserDto } from './dto/createUserDto';
import { updateUserDto } from './dto/updateDtoUser';
import * as argon2 from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { signInUserDto } from './dto/signInUserDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService, private readonly JwtService: JwtService) { }

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async findbyId(id: string) {
        const filterUser = await this.prisma.user.findUnique({
            where: {id}
        })

        if (!filterUser) throw new NotFoundException('Id not found');

        return filterUser;

    }

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await argon2.hash(createUserDto.password)

        return await this.prisma.user.create({
            data: {
                name: createUserDto.name,
                email: createUserDto.email,
                contact: createUserDto.contact,
                password: hashedPassword
            }
        })
    }

    async signIn(signInDto: signInUserDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: signInDto.email,
            }
        })
        if(!user) throw new NotFoundException('user not found');

        const passwordValid = await argon2.verify(user.password, signInDto.password)

        if(!passwordValid) throw new UnauthorizedException('Invalid credentials');

        const playLoad = {sub: user.id, email: user.email, name: user.name};
        return { accessToken: await this.JwtService.sign(playLoad) };
    }

    async findByEmail(email: string) {
        const filterEmail = await this.prisma.user.findUnique({
            where: {email: email}
        })
        if (!filterEmail) throw new NotFoundException('Invalid email');

        return filterEmail;
    }

    async update(id: string, updateDto: updateUserDto) {
        const userIndex = await this.prisma.user.findUnique({
            where: {id}
        })

        if (!userIndex) throw new NotFoundException('Id not found');
        

        const updateUser = await this.prisma.user.update({
            where: {id},
            data: {
                ...userIndex,
                ...updateDto
            }
        })

        return updateUser
    }

    async revome(id: string) {
        const userIndex = await this.prisma.user.findUnique({
            where: {id}
        })

        if(!userIndex) throw new NotFoundException('Id not found');

        await this.prisma.user.delete({
            where: {id}
        })

        return {message: `User with id ${id} removed successfully`};
    }

    /*
    findByEmail(email: string) {
        const user = this.users.find(item => item.email === email);

        if (!user) {
            throw new NotFoundException('Invalid email');
        }
        return user
    }


    create(createUSerDto: CreateUserDto) {
        if (!createUSerDto || !createUSerDto.name || !createUSerDto.email || !createUSerDto.password) {
            throw new NotFoundException('Invalid user data');
        }

        this.lestId++;
        const id = this.lestId;
        const newUser = {
            "id": id.toString(),
            ...createUSerDto
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: string, updateDto: updateUserDto) {
        const userIndex = this.users.findIndex(item => item.id === id);

        if (userIndex >= 0) {
            const updatedUser = this.users[userIndex];
            this.users[userIndex] = {
                ...updatedUser,
                ...updateDto
            }
            return this.users[userIndex];
        } else {
            throw new NotFoundException('User not found');
        }
    }

    remove(id: string) {
        const userIndex = this.users.findIndex(item => item.id === id);

        if (userIndex >= 0) {
            this.users.splice(userIndex, 1)
            return { message: `User with id ${id} removed successfully` };
        } else {
            throw new NotFoundException('User not found');
        }
    } */
}
