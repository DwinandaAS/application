import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Buku, BukuRelations, Peminjaman, Pengembalian} from '../models';
import {PeminjamanRepository} from './peminjaman.repository';
import {PengembalianRepository} from './pengembalian.repository';

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
