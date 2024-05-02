import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Publisher, PublisherRelations, Buku} from '../models';
import {BukuRepository} from './buku.repository';

export class PublisherRepository extends DefaultCrudRepository<
  Publisher,
  typeof Publisher.prototype.id,
  PublisherRelations
> {

  public readonly bukus: HasManyRepositoryFactory<Buku, typeof Publisher.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BukuRepository') protected bukuRepositoryGetter: Getter<BukuRepository>,
  ) {
    super(Publisher, dataSource);
    this.bukus = this.createHasManyRepositoryFactoryFor('bukus', bukuRepositoryGetter,);
    this.registerInclusionResolver('bukus', this.bukus.inclusionResolver);
  }
}
