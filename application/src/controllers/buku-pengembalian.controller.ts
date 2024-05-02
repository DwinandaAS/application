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
  Buku,
  Pengembalian,
} from '../models';
import {BukuRepository} from '../repositories';

export class BukuPengembalianController {
  constructor(
    @repository(BukuRepository) protected bukuRepository: BukuRepository,
  ) { }

  @get('/bukus/{id}/pengembalians', {
    responses: {
      '200': {
        description: 'Array of Buku has many Pengembalian',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pengembalian)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pengembalian>,
  ): Promise<Pengembalian[]> {
    return this.bukuRepository.pengembalians(id).find(filter);
  }

  @post('/bukus/{id}/pengembalians', {
    responses: {
      '200': {
        description: 'Buku model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pengembalian)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Buku.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pengembalian, {
            title: 'NewPengembalianInBuku',
            exclude: ['id'],
            optional: ['bukuId']
          }),
        },
      },
    }) pengembalian: Omit<Pengembalian, 'id'>,
  ): Promise<Pengembalian> {
    return this.bukuRepository.pengembalians(id).create(pengembalian);
  }

  @patch('/bukus/{id}/pengembalians', {
    responses: {
      '200': {
        description: 'Buku.Pengembalian PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pengembalian, {partial: true}),
        },
      },
    })
    pengembalian: Partial<Pengembalian>,
    @param.query.object('where', getWhereSchemaFor(Pengembalian)) where?: Where<Pengembalian>,
  ): Promise<Count> {
    return this.bukuRepository.pengembalians(id).patch(pengembalian, where);
  }

  @del('/bukus/{id}/pengembalians', {
    responses: {
      '200': {
        description: 'Buku.Pengembalian DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pengembalian)) where?: Where<Pengembalian>,
  ): Promise<Count> {
    return this.bukuRepository.pengembalians(id).delete(where);
  }
}
