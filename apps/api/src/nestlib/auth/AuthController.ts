import { pick } from '@lsk4/algos';
import { Err } from '@lsk4/err';
import { createLogger } from '@lsk4/log';
import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  All,
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthRole } from '@nestlib/auth';
import { ErrorInterceptor, ResponseInterceptor } from '@nestlib/interceptors';

import { toUserJson } from '@/api/toUserJson';

import { renderOtpEmail } from '../../emails/OtpEmail';
import { AuthOtpService } from './AuthOtpService';
import { AuthService } from './AuthService';
import { SignInDTO } from './dto/SignIn.dto';
import { SignUpDTO } from './dto/SignUp.dto';
import { UserModel } from './models/UserModel';
import { Request, Response, User } from './types';

@Controller('/api/auth')
@UseInterceptors(new ResponseInterceptor(), new ErrorInterceptor())
export class AuthController {
  constructor(
    private authService: AuthService,
    private otpService: AuthOtpService,

    private configService: ConfigService,
    private mailerService: MailerService,

    @InjectRepository(UserModel)
    private usersRepository: EntityRepository<UserModel>,
  ) {}

  log = createLogger(this.constructor.name);

  @All()
  index(): string {
    return '/api/auth';
  }

  // TODO: не согласен с многим
  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() data: SignInDTO, @Req() req: Request) {
    if (req.session?.user) {
      return {
        _id: req.session.id,
        user: req.session.user,
        session: req.session,
      };
    }
    const { email, password } = data;

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
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() data: SignUpDTO, @Req() req: Request) {
    const { tos, email, password } = data;
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
  async logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie(this.configService.get('auth.session.cookieName'));
    res.status(200).send(this.applySession(req));
  }

  @All('session')
  async session(@Req() req: Request) {
    const { user: sessionUser } = req.session || {};
    if (!sessionUser) return null;

    const id = sessionUser._id || sessionUser.id;
    // const { id } = sessionUser;
    // console.log('[req.session]', req.session);
    // console.log('[id]', id);
    const rawUser = await this.usersRepository.findOne({ _id: id });
    const user = rawUser ? toUserJson(rawUser) : null;
    if (id && !user) {
      this.log.warn('!user', { id, user });
    }

    // if (!rawUser) throw new Err('!user', 'User not found', { status: 404 });
    // return toUserJson(user);

    return {
      _id: req.session.id,
      user,
      session: {
        ...req.session,
        user,
      },
    };
  }

  applySession(req: Request, user?: Partial<User>) {
    return new Promise((resolve, reject) => {
      if (!user) {
        req.session.destroy((err) => {
          if (err) return reject(err);
          return resolve({});
        });
        return;
      }

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

  // TODO: remove TEST only
  @All('getOTPByEmail')
  // @AuthRole(AuthRole.admin)
  async getOTPByEmail(@Req() req: Request) {
    const email = req.body.email || req.query.email;
    if (!email) throw new Err('!email');
    return this.otpService.findByEmail(email);
  }

  // @All('clearSessions')
  // @AuthRole(AuthRole.admin)
  // async clearSessions(@Req() req: Request) {
  //   const email = req.body.email || req.query.email;
  //   if (!email) throw new Err('!email');

  //   // return this.authService.setNewPassword(email, password);
  // }
}
