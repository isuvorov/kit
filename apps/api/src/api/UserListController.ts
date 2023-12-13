import { omit, pick } from '@lsk4/algos';
import { Err } from '@lsk4/err';
import { FilterQuery } from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { All, Body, Controller, Post, Query, UseInterceptors } from '@nestjs/common';

import { ExampleFilter } from '@/examples/Filter';
import { UserModel } from '@/nestlib/auth/models/UserModel';
import { ErrorTransformInterceptor, ResponseTransformInterceptor } from '@/nestlib/interceptors';
import { Find, FindParams } from '@/nestlib/list/FindParams.decorator';

import { getGravatarHash } from './getGravatarHash';

@Controller('api/users')
@UseInterceptors(new ResponseTransformInterceptor(), new ErrorTransformInterceptor())
export class UserListController {
  constructor(
    @InjectRepository(UserModel)
    private usersRepository: EntityRepository<UserModel>,
  ) {}

  @All(['find', 'list'])
  async find(
    @FindParams({
      filterDTO: ExampleFilter,
    })
    findOptions: Find<ExampleFilter>,
  ) {
    const filter: FilterQuery<UserModel> = {};
    if (findOptions.filter.role) {
      filter.role = findOptions.filter.role;
    }
    const raw = await this.usersRepository.find(filter, {
      limit: findOptions.limit,
      offset: findOptions.skip,
    });
    const items = raw.map(this.getUserFields);
    if (!findOptions.count) return { items };
    // TODO: подумать а может распараллелить?
    const total = await this.usersRepository.count();
    const count = await this.usersRepository.count(filter);
    return { items, count, total };
  }

  @All(['findOne', 'get'])
  async findOne(@Query('_id') id) {
    return this.usersRepository.findOne({
      _id: id,
    });
  }

  @Post('create')
  async create() {
    const em = this.usersRepository.getEntityManager() as EntityManager;
    const user = new UserModel();
    user.email = `test+${Math.random()}@gmail.com`;
    user.role = 'user';
    user.password = '123';
    user.companyId = '123';
    await em.persistAndFlush(user);

    return this.getUserFields(user);
  }

  @Post(['update', 'edit'])
  async update(@Query('_id') id, @Body() raw) {
    const em = this.usersRepository.getEntityManager() as EntityManager;
    const data = pick(raw, ['firstName', 'lastName']);
    if (!id) throw new Err('!_id', 'Empty query _id', { status: 400 });
    if (!Object.keys(data).length) throw new Err('!data', 'Empty data', { status: 400 });
    const user = await this.findOne(id);
    if (!user) throw new Err('!user', 'User not found', { status: 404 });
    // TODO: or use em.assign(user, data); ??
    Object.keys(data).forEach((key) => {
      user[key] = data[key];
    });
    await em.persistAndFlush(user);
    // TODO: а может вернуть измененный объект?
    return true;
  }

  @Post(['remove', 'delete'])
  async remove(@Query('_id') id) {
    const em = this.usersRepository.getEntityManager() as EntityManager;
    await em.nativeDelete(UserModel, {
      _id: id,
    });
    return true;
  }

  @All('count')
  async count() {
    return this.usersRepository.count();
  }

  getUserFields(user) {
    const fields = omit(user.toJSON(), ['password']);
    if (!fields.avatar && fields.email) {
      // fields.avatar = `https://gravatar.com/avatar/${getGravatarHash(fields.email)}?s=200&d=retro`;
      // fields.avatar = `https://gravatar.com/avatar/${getGravatarHash(fields.email)}?s=200&d=404`;
      const transparentPixel = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png';
      const hash = getGravatarHash(fields.email);
      const s = 200;
      const d = encodeURIComponent(transparentPixel);
      fields.avatar = `https://gravatar.com/avatar/${hash}?s=${s}&d=${d}`;
    }
    return fields;
  }
}
