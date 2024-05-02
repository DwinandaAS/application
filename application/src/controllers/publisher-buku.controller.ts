import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Publisher,
  Buku,
} from '../models';
import {PublisherRepository} from '../repositories';

export class PublisherBukuController {
  constructor(
    @repository(PublisherRepository) protected publisherRepository: PublisherRepository,
  ) { }

  @get('/publishers/{id}/bukus', {
    responses: {
      '200': {
        description: 'Array of Publisher has many Buku',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Buku)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Buku>,
  ): Promise<Buku[]> {
    return this.publisherRepository.bukus(id).find(filter);
  }

  @post('/publishers/{id}/bukus', {
    responses: {
      '200': {
        description: 'Publisher model instance',
        content: {'application/json': {schema: getModelSchemaRef(Buku)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Publisher.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buku, {
            title: 'NewBukuInPublisher',
            exclude: ['id'],
            optional: ['publisherId']
          }),
        },
      },
    }) buku: Omit<Buku, 'id'>,
  ): Promise<Buku> {
    return this.publisherRepository.bukus(id).create(buku);
  }

  @patch('/publishers/{id}/bukus', {
    responses: {
      '200': {
        description: 'Publisher.Buku PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buku, {partial: true}),
        },
      },
    })
    buku: Partial<Buku>,
    @param.query.object('where', getWhereSchemaFor(Buku)) where?: Where<Buku>,
  ): Promise<Count> {
    return this.publisherRepository.bukus(id).patch(buku, where);
  }

  @del('/publishers/{id}/bukus', {
    responses: {
      '200': {
        description: 'Publisher.Buku DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Buku)) where?: Where<Buku>,
  ): Promise<Count> {
    return this.publisherRepository.bukus(id).delete(where);
  }
}
