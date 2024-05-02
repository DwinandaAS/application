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
  Rak,
  Buku,
} from '../models';
import {RakRepository} from '../repositories';

export class RakBukuController {
  constructor(
    @repository(RakRepository) protected rakRepository: RakRepository,
  ) { }

  @get('/raks/{id}/bukus', {
    responses: {
      '200': {
        description: 'Array of Rak has many Buku',
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
    return this.rakRepository.bukus(id).find(filter);
  }

  @post('/raks/{id}/bukus', {
    responses: {
      '200': {
        description: 'Rak model instance',
        content: {'application/json': {schema: getModelSchemaRef(Buku)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Rak.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buku, {
            title: 'NewBukuInRak',
            exclude: ['id'],
            optional: ['rakId']
          }),
        },
      },
    }) buku: Omit<Buku, 'id'>,
  ): Promise<Buku> {
    return this.rakRepository.bukus(id).create(buku);
  }

  @patch('/raks/{id}/bukus', {
    responses: {
      '200': {
        description: 'Rak.Buku PATCH success count',
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
    return this.rakRepository.bukus(id).patch(buku, where);
  }

  @del('/raks/{id}/bukus', {
    responses: {
      '200': {
        description: 'Rak.Buku DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Buku)) where?: Where<Buku>,
  ): Promise<Count> {
    return this.rakRepository.bukus(id).delete(where);
  }
}
