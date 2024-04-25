import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Anggota, AnggotaRelations} from '../models';

export class AnggotaRepository extends DefaultCrudRepository<
  Anggota,
  typeof Anggota.prototype.id,
  AnggotaRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Anggota, dataSource);
  }
}
