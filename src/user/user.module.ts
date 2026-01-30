import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [JwtStrategy],
  imports: [
    PassportModule,
    PrismaModule, JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      })
  })],
})
export class UserModule {}
