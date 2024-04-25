import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Publisher, PublisherRelations} from '../models';

export class PublisherRepository extends DefaultCrudRepository<
  Publisher,
  typeof Publisher.prototype.id,
  PublisherRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Publisher, dataSource);
  }
}
