import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Peminjaman, PeminjamanRelations} from '../models';

export class PeminjamanRepository extends DefaultCrudRepository<
  Peminjaman,
  typeof Peminjaman.prototype.id,
  PeminjamanRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Peminjaman, dataSource);
  }
}
