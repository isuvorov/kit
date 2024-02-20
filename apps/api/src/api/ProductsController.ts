import { FilterQuery } from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { All, Body, Controller, Post, Query, UseInterceptors } from '@nestjs/common';
import { AuthUserModel } from '@nestlib/auth/models';
import { Find, FindParams } from '@nestlib/decorators';
import { ErrorInterceptor, ResponseInterceptor } from '@nestlib/interceptors';

import { ExampleFilter } from '@/examples/Filter';

@Controller('api/products')
@UseInterceptors(new ResponseInterceptor(), new ErrorInterceptor())
export class ProductsController {
  constructor(
    @InjectRepository(AuthUserModel)
    private usersRepository: EntityRepository<AuthUserModel>,
  ) {}

  @All(['find', 'list'])
  async find(
    @FindParams({
      filterDTO: ExampleFilter,
    })
    data: Find<ExampleFilter>,
  ) {
    const filter: FilterQuery<AuthUserModel> = {};
    if (data.filter.role) {
      filter.role = data.filter.role;
    }
    return this.usersRepository.find(filter, {
      limit: data.limit,
      offset: data.offset,
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
    const user = new AuthUserModel();
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
