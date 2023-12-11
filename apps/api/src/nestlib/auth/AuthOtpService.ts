import { Err } from '@lsk4/err';
import { EntityRepository, ObjectId } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

// import { InjectRepository } from '@nestjs/typeorm';
import { OtpModel } from './models/OtpModel';
import { UserModel } from './models/UserModel';
import { generateCode } from './utils';

const otpTypes = {
  default: {
    type: 'hex',
    length: 12,
    expired: 3 * 60 * 60 * 1000,
  },
  '4digit': {
    type: 'number',
    length: 4,
    expired: 1 * 60 * 60 * 1000,
  },
  '6digit': {
    type: 'number',
    length: 6,
    expired: 1 * 60 * 60 * 1000,
  },
  // url: {
  //   type: 'url',
  //   length: 20,
  //   expired: 24 * 60 * 60 * 1000,
  // },
  // phoneVerify: {
  //   type: 'number',
  //   length: 6,
  //   expired: 1 * 60 * 60 * 1000,
  // },
  // emailVerify: {
  //   type: 'number',
  //   length: 6,
  //   expired: 24 * 60 * 60 * 1000,
  // },
  emailVerify: {
    type: 'url',
    length: 20,
    expired: 24 * 60 * 60 * 1000,
  },
  // authToken: {
  //   type: 'hash',
  //   uniq: true,
  //   expired: 30 * 24 * 60 * 60 * 1000,
  // },
};

@Injectable()
export class AuthOtpService {
  constructor(
    @InjectRepository(UserModel)
    private usersRepository: EntityRepository<UserModel>,

    @InjectRepository(OtpModel)
    private otpsRepository: EntityRepository<OtpModel>,
  ) {}

  generateCode(scenario, params = {}) {
    let scenarioConfig = otpTypes[scenario];
    if (!scenarioConfig) throw new Err('!scenario', { scenario });
    scenarioConfig = {
      ...scenarioConfig,
      ...params,
    };
    // if (scenarioConfig.uniq) return generateUniqCode(scenarioConfig);
    return generateCode(scenarioConfig);
  }

  getExpiredAt(scenario, params = {}) {
    let scenarioConfig = otpTypes[scenario];
    if (!scenarioConfig) throw new Err('!scenario', { scenario });
    scenarioConfig = {
      ...scenarioConfig,
      ...params,
    };
    const expired = scenarioConfig.expired || 1 * 60 * 60 * 1000;
    return new Date(Date.now() + expired);
  }

  async createOtp(scenario, params: any): Promise<any> {
    const code = this.generateCode(scenario);
    const expiredAt = this.getExpiredAt(scenario);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const otpId = await this.otpsRepository.nativeInsert({
      ...params,
      code,
      expiredAt,
    });

    if (!otpId) {
      throw new Err('auth.notCreated', { status: 500, message: 'OTP not created' });
    }
    const otp = await this.otpsRepository.findOne({ _id: otpId as ObjectId });

    return otp;
  }
  // TODO: only for TEST, remove
  async findByEmail(email: string): Promise<any> {
    const otp = await this.otpsRepository.findOne({
      // @ts-ignore
      'params.email': email,
    });
    return otp?.code;
  }
  async findAndCheck(otpId, code): Promise<any> {
    const otp = await this.otpsRepository.findOne({ _id: otpId });
    if (!otp) {
      throw new Err('auth.otpNotFound', { status: 404, message: 'OTP not found' });
    }
    if (otp.code !== code) {
      throw new Err('auth.otpIncorrect', { status: 400, message: 'OTP incorrect' });
    }
    if (otp.activatedAt) {
      throw new Err('auth.otpAlreadyActivated', { status: 400, message: 'OTP already activated' });
    }
    if (otp.expiredAt < new Date()) {
      throw new Err('auth.otpExpired', { status: 400, message: 'OTP expired' });
    }
    return otp;
  }
  async activate(otpId, code): Promise<any> {
    const otp = await this.otpsRepository.findOne(otpId);
    if (!otp) {
      throw new Err('auth.otpNotFound', { status: 404, message: 'OTP not found' });
    }
    if (otp.code !== code) {
      throw new Err('auth.otpIncorrect', { status: 400, message: 'OTP incorrect' });
    }
    // NOTE: осозанно выключена ошибка
    if (otp.activatedAt) return;
    //   throw new Err('auth.otpAlreadyActivated', { status: 400, message: 'OTP already activated' });
    // }
    if (otp.expiredAt < new Date()) {
      throw new Err('auth.otpExpired', { status: 400, message: 'OTP expired' });
    }
    await this.otpsRepository.nativeUpdate({ _id: otpId }, { activatedAt: new Date() });
    // const user = await this.usersRepository.findOne({ email: otp.params.email });
    // if (!user) {
    //   throw new Err('auth.userNotFound', { status: 404, message: 'User not found' });
    // }
    // const session = await this.usersRepository.createSession(user);
    // await this.otpsRepository.removeAndFlush(otp);
    // return {
    //   session,
    // };
  }
}
