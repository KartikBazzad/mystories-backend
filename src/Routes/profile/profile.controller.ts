import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/utils/constants';

@Controller('profile')
export class ProfileController {
  @Public()
  @Get()
  sayHello() {
    return 'Hello';
  }
}
