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

  public readonly peminjaman: HasManyRepositoryFactory<Peminjaman, typeof Buku.prototype.id>;

  public readonly pengembalians: HasManyRepositoryFactory<Pengembalian, typeof Buku.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, 
    @repository.getter('PeminjamanRepository') protected peminjamanRepositoryGetter: Getter<PeminjamanRepository>, 
    @repository.getter('PengembalianRepository') protected pengembalianRepositoryGetter: Getter<PengembalianRepository>,
  ) {
    super(Buku, dataSource);
    this.peminjaman = this.createHasManyRepositoryFactoryFor('peminjaman', peminjamanRepositoryGetter,);
    this.registerInclusionResolver('peminjaman', this.peminjaman.inclusionResolver);
    this.pengembalians = this.createHasManyRepositoryFactoryFor('pengembalians', pengembalianRepositoryGetter,);
    this.registerInclusionResolver('pengembalians', this.pengembalians.inclusionResolver);
  }
}
