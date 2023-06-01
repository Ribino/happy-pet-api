import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { isNumber } from 'lodash';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    const userType = this.usersService.getUserType(user);
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      type: userType,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async existsUser(params: {
    id?: string;
    email?: string;
    cpf?: string;
  }): Promise<boolean> {
    return await this.usersService.existsUser({
      id: isNumber(params.id) ? Number(params.id) : undefined,
      email: params.email,
      cpf: params.cpf,
    });
  }
}
