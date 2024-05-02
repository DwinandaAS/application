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
  Anggota,
  Pengembalian,
} from '../models';
import {AnggotaRepository} from '../repositories';

export class AnggotaPengembalianController {
  constructor(
    @repository(AnggotaRepository) protected anggotaRepository: AnggotaRepository,
  ) { }

  @get('/anggotas/{id}/pengembalians', {
    responses: {
      '200': {
        description: 'Array of Anggota has many Pengembalian',
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
    return this.anggotaRepository.pengembalians(id).find(filter);
  }

  @post('/anggotas/{id}/pengembalians', {
    responses: {
      '200': {
        description: 'Anggota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pengembalian)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Anggota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pengembalian, {
            title: 'NewPengembalianInAnggota',
            exclude: ['id'],
            optional: ['anggotaId']
          }),
        },
      },
    }) pengembalian: Omit<Pengembalian, 'id'>,
  ): Promise<Pengembalian> {
    return this.anggotaRepository.pengembalians(id).create(pengembalian);
  }

  @patch('/anggotas/{id}/pengembalians', {
    responses: {
      '200': {
        description: 'Anggota.Pengembalian PATCH success count',
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
    return this.anggotaRepository.pengembalians(id).patch(pengembalian, where);
  }

  @del('/anggotas/{id}/pengembalians', {
    responses: {
      '200': {
        description: 'Anggota.Pengembalian DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pengembalian)) where?: Where<Pengembalian>,
  ): Promise<Count> {
    return this.anggotaRepository.pengembalians(id).delete(where);
  }
}
