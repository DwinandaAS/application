import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Author, AuthorRelations, Buku} from '../models';
import {BukuRepository} from './buku.repository';

export class AuthorRepository extends DefaultCrudRepository<
  Author,
  typeof Author.prototype.id,
  AuthorRelations
> {

  public readonly bukus: HasManyRepositoryFactory<Buku, typeof Author.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BukuRepository') protected bukuRepositoryGetter: Getter<BukuRepository>,
  ) {
    super(Author, dataSource);
    this.bukus = this.createHasManyRepositoryFactoryFor('bukus', bukuRepositoryGetter,);
    this.registerInclusionResolver('bukus', this.bukus.inclusionResolver);
  }
}