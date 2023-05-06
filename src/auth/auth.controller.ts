import { Body, Controller, Get, Head, HttpCode, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators';
import { Response } from 'express';
import { isNumber } from 'lodash';

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

  @Public()
  @Head('user')
  async existsUser(@Query() param: {id?: string, email?: string, cpf?: string}, @Res() res: Response) {
    const exists = await this.authService.existsUser({
       id : isNumber(param.id) ? Number(param.id) : undefined,
       email: param.email,
       cpf: param.cpf
    });

    res.status(exists ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    res.end();
  }

}
