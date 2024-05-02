import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Pengembalian, PengembalianRelations} from '../models';

export class PengembalianRepository extends DefaultCrudRepository<
  Pengembalian,
  typeof Pengembalian.prototype.id,
  PengembalianRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Pengembalian, dataSource);
  }
}
