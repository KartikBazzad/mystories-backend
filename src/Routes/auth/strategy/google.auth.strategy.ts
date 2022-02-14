import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../services/auth.service';
import { customAlphabet } from 'nanoid';
const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URL,
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: CallableFunction,
  ) {
    try {
      const findUser = await this.authService.validate(profile.id);
      if (!findUser) {
        const userId = customAlphabet(alphabet, 12);
        const createNewUser = await this.authService.createUser({
          googleId: profile.id,
          email: profile._json.email,
          userId: userId(),
          photo: profile._json.picture,
          username: profile.displayName,
        });
        return done(null, createNewUser);
      }
      const updateUser = await this.authService.updateUser({
        userId: findUser.userId,
        photo: profile._json.picture,
        username: profile.displayName,
      });
      return done(null, updateUser);
    } catch (error) {
      console.log(error);
    }
  }
}
