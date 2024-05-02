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
  Peminjaman,
} from '../models';
import {BukuRepository} from '../repositories';

export class BukuPeminjamanController {
  constructor(
    @repository(BukuRepository) protected bukuRepository: BukuRepository,
  ) { }

  @get('/bukus/{id}/peminjamen', {
    responses: {
      '200': {
        description: 'Array of Buku has many Peminjaman',
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
    return this.bukuRepository.peminjaman(id).find(filter);
  }

  @post('/bukus/{id}/peminjamen', {
    responses: {
      '200': {
        description: 'Buku model instance',
        content: {'application/json': {schema: getModelSchemaRef(Peminjaman)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Buku.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peminjaman, {
            title: 'NewPeminjamanInBuku',
            exclude: ['id'],
            optional: ['bukuId']
          }),
        },
      },
    }) peminjaman: Omit<Peminjaman, 'id'>,
  ): Promise<Peminjaman> {
    return this.bukuRepository.peminjaman(id).create(peminjaman);
  }

  @patch('/bukus/{id}/peminjamen', {
    responses: {
      '200': {
        description: 'Buku.Peminjaman PATCH success count',
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
    return this.bukuRepository.peminjaman(id).patch(peminjaman, where);
  }

  @del('/bukus/{id}/peminjamen', {
    responses: {
      '200': {
        description: 'Buku.Peminjaman DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Peminjaman)) where?: Where<Peminjaman>,
  ): Promise<Count> {
    return this.bukuRepository.peminjaman(id).delete(where);
  }
}
