import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly LoginService: LoginService) {}

  @Post('student')
  async login(@Body() data: LoginDto) {
    return this.LoginService.signIn(data);
  }
}
