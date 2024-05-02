import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Anggota, Peminjaman, PeminjamanRelations, Buku} from '../models';
import { AnggotaRepository } from './anggota.repository';
import {BukuRepository} from './buku.repository';

export class PeminjamanRepository extends DefaultCrudRepository<
  Peminjaman,
  typeof Peminjaman.prototype.id,
  PeminjamanRelations
> {
  public readonly anggota: BelongsToAccessor<Anggota, typeof Anggota.prototype.id>;

  public readonly buku: BelongsToAccessor<Buku, typeof Buku.prototype.id>

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter(AnggotaRepository) protected anggotaRepositoryGetter: Getter<AnggotaRepository>,
    @repository.getter(BukuRepository) protected bukuRepositoryGetter: Getter<BukuRepository>
  ) {
    super(Peminjaman, dataSource);
    this.anggota = this.createBelongsToAccessorFor('anggota', anggotaRepositoryGetter)
    this.registerInclusionResolver('anggota', this.anggota.inclusionResolver)
    this.buku = this.createBelongsToAccessorFor('buku', bukuRepositoryGetter)
    this.registerInclusionResolver('buku', this.buku.inclusionResolver)
  }
}
