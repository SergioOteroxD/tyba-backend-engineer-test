import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IjwtDriver } from '../jwt.driver';

@Injectable()
export class JwtDriver implements IjwtDriver{
  constructor(private jwtService: JwtService) {}

  async sign(token: any) {
    return await this.jwtService.signAsync(token);
  }

  async verify(token: any) {
    return await this.jwtService.verifyAsync(token);
  }
}
