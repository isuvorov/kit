// eslint-disable-next-line max-classes-per-file
import { pick } from '@lsk4/algos';
import { Err } from '@lsk4/err';
import { FilterQuery, wrap } from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { All, Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthUserModel } from '@nestlib/auth';
import { Find, FindParams, Query } from '@nestlib/decorators';
import { ErrorInterceptor, ResponseInterceptor } from '@nestlib/interceptors';
import { IsOptional, IsString } from 'class-validator';

export class ExampleFilter {
  @IsString()
  @IsOptional()
  role: string;
}

@Controller('api/users')
@UseInterceptors(new ResponseInterceptor(), new ErrorInterceptor())
export class UserListController {
  constructor(
    @InjectRepository(AuthUserModel)
    private usersRepository: EntityRepository<AuthUserModel>,
  ) {}

  @All(['find', 'list'])
  async find(
    @FindParams({
      filterDTO: ExampleFilter,
    })
    findOptions: Find<ExampleFilter>,
  ) {
    const filter: FilterQuery<AuthUserModel> = {};
    if (findOptions.filter.role) {
      filter.role = findOptions.filter.role;
    }
    const raw = await this.usersRepository.find(filter, {
      limit: findOptions.limit,
      offset: findOptions.skip,
    });
    const items = raw.map((u) => u.toJSON());
    if (!findOptions.count) return { items };
    // TODO: подумать а может распараллелить?
    const total = await this.usersRepository.count();
    const count = await this.usersRepository.count(filter);
    return { items, count, total };
  }

  @All(['findOne', 'get'])
  async findOne(@Query('_id') _id, @Query('id') id) {
    // eslint-disable-next-line no-param-reassign
    id = id || _id;
    if (!id) throw new Err('!_id', 'Empty query _id', { status: 400 });
    const user = await this.usersRepository.findOne({
      _id: id,
    });
    if (!user) throw new Err('!user', 'User not found', { status: 404 });
    return user;
  }

  @Post('create')
  async create() {
    const em = this.usersRepository.getEntityManager() as EntityManager;
    const user = new AuthUserModel();
    user.email = `test+${Math.random()}@gmail.com`;
    user.role = 'user';
    user.password = '123';
    user.companyId = '123';
    await em.persistAndFlush(user);

    return user;
  }

  @Post(['update', 'edit'])
  async update(@Query(['_id', 'id']) id, @Body() raw) {
    const em = this.usersRepository.getEntityManager() as EntityManager;
    const data = pick(raw, ['info']);
    if (!id) throw new Err('!_id', 'Empty query _id', { status: 400 });
    if (!Object.keys(data).length) throw new Err('!data', 'Empty data', { status: 400 });
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new Err('!user', 'User not found', { status: 404 });

    wrap(user).assign({ info: data.info || {} }, { mergeObjects: true });
    await em.persistAndFlush(user);
    // TODO: а может вернуть измененный объект?
    return true;
  }

  @Post(['remove', 'delete'])
  async remove(@Query('_id') id) {
    const em = this.usersRepository.getEntityManager() as EntityManager;
    await em.nativeDelete(AuthUserModel, {
      _id: id,
    });
    return true;
  }

  @All('count')
  async count() {
    return this.usersRepository.count();
  }
}
