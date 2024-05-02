import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Anggota, AnggotaRelations, Peminjaman, Pengembalian} from '../models';
import {PeminjamanRepository} from './peminjaman.repository';
import {PengembalianRepository} from './pengembalian.repository';

export class AnggotaRepository extends DefaultCrudRepository<
  Anggota,
  typeof Anggota.prototype.id,
  AnggotaRelations
> {

  public readonly peminjaman: HasManyRepositoryFactory<Peminjaman, typeof Anggota.prototype.id>;

  public readonly pengembalians: HasManyRepositoryFactory<Pengembalian, typeof Anggota.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PeminjamanRepository') protected peminjamanRepositoryGetter: Getter<PeminjamanRepository>, @repository.getter('PengembalianRepository') protected pengembalianRepositoryGetter: Getter<PengembalianRepository>,
  ) {
    super(Anggota, dataSource);
    this.pengembalians = this.createHasManyRepositoryFactoryFor('pengembalians', pengembalianRepositoryGetter,);
    this.registerInclusionResolver('pengembalians', this.pengembalians.inclusionResolver);
    this.peminjaman = this.createHasManyRepositoryFactoryFor('peminjaman', peminjamanRepositoryGetter,);
    this.registerInclusionResolver('peminjaman', this.peminjaman.inclusionResolver);
  }
}
