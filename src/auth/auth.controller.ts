import { Body, Controller, Get, Head, HttpCode, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signin')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Head('user')
  async existsUser(@Query() params: {id?: string, email?: string, cpf?: string}, @Res() res: Response) {
    const exists = await this.authService.existsUser(params);
    res.status(exists ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    res.end();
  }

}
