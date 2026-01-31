import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtUserGuard } from 'src/user/jwt.user.guard';
import { CurrentUser } from 'src/user/current.user.decorataor';
import { CurrentUserDto } from 'src/user/dto/userPlayLoad.dto';

@Controller('feature')
export class FeatureController {

    @Get("public")
    getPublicFeature() {
        return 'This is a public feature'
    }

    @Get("private")
    @UseGuards(JwtUserGuard)
    getPrivateFeature(@CurrentUser() user: CurrentUserDto) {
        return `Olá ${user.name} seu acesso Àrea privada`
    }
}
