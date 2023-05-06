import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signin')
  signIn(@Body() signInDto: Record<string, string>) {
    console.log('sign')
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get('exists/:email')
  existsByEmail(@Param('email') email: string) {
    return this.authService.existsByEmail(email);
  }

}
