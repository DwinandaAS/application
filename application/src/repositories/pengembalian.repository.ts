import {inject, Getter} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import { Buku, Pengembalian, PengembalianRelations} from '../models';
import { BukuRepository } from './buku.repository';

export class PengembalianRepository extends DefaultCrudRepository<
  Pengembalian,
  typeof Pengembalian.prototype.id,
  PengembalianRelations
> {
  public readonly buku: BelongsToAccessor<Buku, typeof Buku.prototype.id>

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter(BukuRepository) protected bukuRepositoryGetter: Getter<BukuRepository>
  ) {
    super(Pengembalian, dataSource);
    this.buku = this.createBelongsToAccessorFor('buku', bukuRepositoryGetter)
    this.registerInclusionResolver('buku', this.buku.inclusionResolver)
  }
}
