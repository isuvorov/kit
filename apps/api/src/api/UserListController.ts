// eslint-disable-next-line max-classes-per-file
import { pick } from '@lsk4/algos';
import { Err } from '@lsk4/err';
import { FilterQuery, wrap } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mongodb';
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

@Controller('/api/users')
@UseInterceptors(new ResponseInterceptor(), new ErrorInterceptor())
export class UserListController {
  constructor(
    @InjectRepository(AuthUserModel)
    private repo: EntityRepository<AuthUserModel>,
  ) {}

  @All(['find', 'list'])
  async find(
    @FindParams({ filterDTO: ExampleFilter })
    findOptions: Find<ExampleFilter>,
  ) {
    const filter: FilterQuery<AuthUserModel> = {};
    if (findOptions.filter.role) {
      filter.role = findOptions.filter.role;
    }
    const raw = await this.repo.find(filter, {
      limit: findOptions.limit,
      offset: findOptions.offset,
    });
    const items = raw;
    // const items = raw.map((u) => u.toJSON());
    if (!findOptions.count) return { items };
    // TODO: подумать а может распараллелить?
    const total = await this.repo.count();
    const count = !Object.keys(filter).length ? total : await this.repo.count(filter);
    return { items, count, total };
  }

  @All(['findOne', 'get'])
  async findOne(@Query(['_id', 'id']) id) {
    if (!id) throw new Err('!_id', 'Empty query _id', { status: 400 });
    const item = await this.repo.findOne({ _id: id });
    if (!item) throw new Err('!item', 'Item not found', { status: 404 });
    return item;
  }

  @Post('create')
  async create() {
    const em = this.repo.getEntityManager();
    const user = new AuthUserModel({
      email: `test+${Math.random()}@gmail.com`,
      role: 'user',
      password: '123',
      companyId: '123',
    });
    await em.persistAndFlush(user);

    return user;
  }

  @Post(['update', 'edit'])
  async update(@Query(['_id', 'id']) id, @Body() raw) {
    const em = this.repo.getEntityManager();
    const data = pick(raw, ['info']);
    if (!id) throw new Err('!_id', 'Empty query _id', { status: 400 });
    if (!Object.keys(data).length) throw new Err('!data', 'Empty data', { status: 400 });
    const item = await this.repo.findOne(id);
    if (!item) throw new Err('!item', 'Item not found', { status: 404 });

    wrap(item).assign({ info: data.info || {} }, { mergeObjectProperties: true });
    await em.persistAndFlush(item);
    // TODO: а может вернуть измененный объект?
    return true;
  }

  @Post(['remove', 'delete'])
  async remove(@Query(['_id', 'id']) id) {
    const em = this.repo.getEntityManager();
    await em.nativeDelete(AuthUserModel, {
      _id: id,
    });
    return true;
  }

  @All('count')
  async count() {
    return this.repo.count();
  }
}
