import { FilterQuery } from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { All, Body, Controller, Post, Query, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor, ResponseInterceptor } from '@nestlib/interceptors';

import { ExampleFilter } from '@/examples/Filter';
import { UserModel } from '@/nestlib/auth/models/UserModel';
import { Find, FindParams } from '@/nestlib/list/FindParams.decorator';

@Controller('api/list')
@UseInterceptors(new ResponseInterceptor(), new ErrorInterceptor())
export class ExampleListController {
  constructor(
    @InjectRepository(UserModel)
    private usersRepository: EntityRepository<UserModel>,
  ) {}

  @All(['find', 'list'])
  async find(
    @FindParams({
      filterDTO: ExampleFilter,
    })
    data: Find<ExampleFilter>,
  ) {
    const filter: FilterQuery<UserModel> = {};
    if (data.filter.role) {
      filter.role = data.filter.role;
    }
    return this.usersRepository.find(filter, {
      limit: data.limit,
      offset: data.skip,
    });
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
    return user;
  }

  @Post(['update', 'edit'])
  async update(@Query('_id') id, @Body('role') role) {
    const em = this.usersRepository.getEntityManager() as EntityManager;
    if (typeof role !== 'string') return false;
    const user = await this.findOne(id);
    user.role = role;
    await em.persistAndFlush(user);
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
}
