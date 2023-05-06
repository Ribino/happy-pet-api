import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'lodash';

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

    const userType = this.usersService.getUserType(user)
    const payload = {
      id: user.id,
      email: user.email,
      type: userType
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async existsByEmail(email: string): Promise<boolean> {
    return await this.usersService.existsByEmail(email);
  }
}
