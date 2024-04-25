import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Rak, RakRelations} from '../models';

export class RakRepository extends DefaultCrudRepository<
  Rak,
  typeof Rak.prototype.kode_rak,
  RakRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Rak, dataSource);
  }
}
