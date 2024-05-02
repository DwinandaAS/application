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
  Peminjaman,
} from '../models';
import {AnggotaRepository} from '../repositories';

export class AnggotaPeminjamanController {
  constructor(
    @repository(AnggotaRepository) protected anggotaRepository: AnggotaRepository,
  ) { }

  @get('/anggotas/{id}/peminjaman', {
    responses: {
      '200': {
        description: 'Array of Anggota has many Peminjaman',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Peminjaman)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Peminjaman>,
  ): Promise<Peminjaman[]> {
    return this.anggotaRepository.peminjaman(id).find(filter);
  }

  @post('/anggotas/{id}/peminjaman', {
    responses: {
      '200': {
        description: 'Anggota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Peminjaman)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Anggota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peminjaman, {
            title: 'NewPeminjamanInAnggota',
            exclude: ['id'],
            optional: ['anggotaId']
          }),
        },
      },
    }) peminjaman: Omit<Peminjaman, 'id'>,
  ): Promise<Peminjaman> {
    return this.anggotaRepository.peminjaman(id).create(peminjaman);
  }

  @patch('/anggotas/{id}/peminjaman', {
    responses: {
      '200': {
        description: 'Anggota.Peminjaman PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peminjaman, {partial: true}),
        },
      },
    })
    peminjaman: Partial<Peminjaman>,
    @param.query.object('where', getWhereSchemaFor(Peminjaman)) where?: Where<Peminjaman>,
  ): Promise<Count> {
    return this.anggotaRepository.peminjaman(id).patch(peminjaman, where);
  }

  @del('/anggotas/{id}/peminjaman', {
    responses: {
      '200': {
        description: 'Anggota.Peminjaman DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Peminjaman)) where?: Where<Peminjaman>,
  ): Promise<Count> {
    return this.anggotaRepository.peminjaman(id).delete(where);
  }
}
