import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Buku, BukuRelations} from '../models';

export class BukuRepository extends DefaultCrudRepository<
  Buku,
  typeof Buku.prototype.id,
  BukuRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Buku, dataSource);
  }
}
