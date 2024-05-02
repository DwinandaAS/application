import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Rak, RakRelations, Buku} from '../models';
import {BukuRepository} from './buku.repository';

export class RakRepository extends DefaultCrudRepository<
  Rak,
  typeof Rak.prototype.kode_rak,
  RakRelations
> {

  public readonly bukus: HasManyRepositoryFactory<Buku, typeof Rak.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BukuRepository') protected bukuRepositoryGetter: Getter<BukuRepository>,
  ) {
    super(Rak, dataSource);
    this.bukus = this.createHasManyRepositoryFactoryFor('bukus', bukuRepositoryGetter,);
    this.registerInclusionResolver('bukus', this.bukus.inclusionResolver);
  }
}
