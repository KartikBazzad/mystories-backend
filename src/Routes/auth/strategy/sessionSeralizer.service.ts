import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }
  async serializeUser(user, done: (err, user) => void) {
    done(null, user);
  }
  async deserializeUser(user, done: (err, user) => void) {
    const finduser = await this.authService.validate(user.googlId);
    if (!finduser) return done(null, null);
    return done(null, finduser);
  }
}
