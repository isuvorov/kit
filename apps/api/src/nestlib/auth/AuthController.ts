import { pick } from '@lsk4/algos';
import { Err } from '@lsk4/err';
import { All, Body, Controller, Get, HttpStatus, Post, Req, UseInterceptors } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthRole } from '@nestlib/auth';

import { renderOtpEmail } from '../../emails/OtpEmail';
import { ResponseTransformInterceptor } from '../interceptors/ResponseTransformInterceptor';
import { AuthOtpService } from './AuthOtpService';
import { AuthService } from './AuthService';
import { Request, User } from './types';

@Controller('/api/auth')
@UseInterceptors(new ResponseTransformInterceptor())
export class AuthController {
  constructor(
    private authService: AuthService,
    private otpService: AuthOtpService,

    private mailerService: MailerService,
  ) {}

  @All()
  index(): string {
    return '/api/auth';
  }

  // TODO: не согласен с многим
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Req() req: Request,
  ) {
    if (req.session?.user) {
      return {
        _id: req.session.id,
        user: req.session.user,
        session: req.session,
      };
    }

    const { isPasswordValid, user } = await this.authService.verifyUserCredentials({
      email,
      password,
    });

    if (!isPasswordValid) {
      throw new Err('auth.loginUser', {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid password',
      });
    }

    return this.applySession(req, user);
  }

  @All('email')
  async email() {
    const html = renderOtpEmail({ code: 1234 });
    await this.mailerService.sendMail({
      to: 'me@coder24.ru',
      subject: 'Testing react template',
      template: 'OtpEmail', // The compiled extension is appended automatically.
      context: {
        // Data to be passed as props to your template.
        code: '123456',
        name: 'John Doe',
      },
    });
    return {
      __raw: html,
    };
  }

  @Post('signup')
  async signup(
    @Body('tos') tos: boolean,
    @Body('email') email: string,
    @Body('password') password: string,
    @Req() req: Request,
  ) {
    if (req.session?.user) {
      return {
        _id: req.session.id,
        user: req.session.user,
        session: req.session,
      };
    }
    if (!tos) {
      throw new Err('incorrectParams', {
        status: HttpStatus.BAD_REQUEST,
        message: 'Tos is required',
      });
    }
    if (!email) {
      throw new Err('incorrectParams', {
        status: HttpStatus.BAD_REQUEST,
        message: 'Email is required',
      });
    }
    // TODO: check email
    if (!password) {
      throw new Err('incorrectParams', {
        status: HttpStatus.BAD_REQUEST,
        message: 'Password is required',
      });
    }
    // TODO: check password difficulty
    if (await this.authService.isUserExists(email)) {
      throw new Err('auth.emailExists', {
        status: HttpStatus.BAD_REQUEST,
        message: 'User already exists',
      });
    }
    const passwordHash = await this.authService.hashPassword(password);
    const otp = await this.otpService.createOtp('6digit', {
      type: 'signup',
      params: {
        email,
        passwordHash,
        createdAt: new Date(),
      },
    });
    await this.mailerService.sendMail({
      to: email,
      subject: 'Complete your registration',
      template: 'OtpEmail', // The compiled extension is appended automatically.
      context: {
        otpId: otp._id,
        otpUrl: `${process.env.APP_URL}/auth/otp?_id=${otp._id}`,
        code: otp.code,
        name: 'John Doe',
      },
    });
    return {
      otp: pick(otp, ['_id', 'type', 'createdAt', 'expiredAt', 'params.email']),
    };
  }

  @Post('webapp/signup')
  async webappSignup(
    @Body('tos') tos: boolean,
    @Body('email') email: string,
    @Body('telegramInitData') telegramInitData: any,
    @Req() req: Request,
  ) {
    if (req.session?.user) {
      return {
        _id: req.session.id,
        user: req.session.user,
        session: req.session,
      };
    }
    if (!tos) {
      throw new Err('incorrectParams', {
        status: HttpStatus.BAD_REQUEST,
        message: 'Tos is required',
      });
    }
    if (!email) {
      throw new Err('incorrectParams', {
        status: HttpStatus.BAD_REQUEST,
        message: 'Email is required',
      });
    }
    if (!telegramInitData) {
      throw new Err('incorrectParams', {
        status: HttpStatus.BAD_REQUEST,
        message: 'telegramInitData is required',
      });
    }
    if (await this.authService.isUserExists(email)) {
      throw new Err('auth.emailExists', {
        status: HttpStatus.BAD_REQUEST,
        message: 'User already exists',
      });
    }
    const otp = await this.otpService.createOtp('4digit', {
      type: 'webappSignup',
      params: {
        email,
        createdAt: new Date(),
        telegramInitData,
      },
    });
    await this.mailerService.sendMail({
      to: email,
      subject: 'Complete your registration',
      template: 'OtpEmail', // The compiled extension is appended automatically.
      context: {
        otpId: otp._id,
        otpUrl: `${process.env.APP_URL}/auth/otp?_id=${otp._id}`,
        code: otp.code,
        name: 'John Doe',
      },
    });
    return {
      otp: pick(otp, ['_id', 'type', 'createdAt', 'expiredAt', 'params.email']),
    };
  }

  @Post('otp/activate')
  async otpActivate(@Body('otpId') otpId: string, @Body('code') code: string, @Req() req: Request) {
    if (req.session?.user) {
      return {
        _id: req.session.id,
        user: req.session.user,
        session: req.session,
      };
    }
    if (!otpId) {
      throw new Err('incorrectParams', {
        status: HttpStatus.BAD_REQUEST,
        message: 'otpId is required',
      });
    }
    if (!code) {
      throw new Err('incorrectParams', {
        status: HttpStatus.BAD_REQUEST,
        message: 'Code is required',
      });
    }
    const otp = await this.otpService.findAndCheck(otpId, code);
    const user = await this.authService.createUser(otp.params);
    await this.otpService.activate(otpId, code);
    return this.applySession(req, user as any);
  }

  @All('hashPassword')
  @AuthRole(AuthRole.admin)
  async hashPassword(@Req() req: Request) {
    const password = req.body.password || req.query.password;

    return this.authService.hashPassword(password);
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    if (!req.session?.user) return {};

    return this.applySession(req, null);
  }

  @All('session')
  async session(@Req() req: Request) {
    const { user } = req.session || {};
    if (!user) return null;
    return {
      _id: req.session.id,
      user,
      session: req.session,
    };
  }

  applySession(req: Request, user: Partial<User>) {
    return new Promise((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) return reject(err);
        req.session.user = user;
        return req.session.save((_err) => {
          if (_err) return reject(_err);
          return resolve({
            _id: req.session.id,
            user: req.session.user,
            session: req.session,
          });
        });
      });
    });
  }

  /// TODO: remove ADMIN only

  @All('setNewPassword')
  @AuthRole(AuthRole.admin)
  async setNewPassword(@Req() req: Request) {
    const email = req.body.email || req.query.email;
    if (!email) throw new Err('!email');
    const password = req.body.password || req.query.password;
    if (!password) throw new Err('!password');
    return this.authService.setNewPassword(email, password);
  }

  // @All('clearSessions')
  // @AuthRole(AuthRole.admin)
  // async clearSessions(@Req() req: Request) {
  //   const email = req.body.email || req.query.email;
  //   if (!email) throw new Err('!email');

  //   // return this.authService.setNewPassword(email, password);
  // }
}
