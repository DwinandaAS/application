import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Peminjaman} from '../models';
import {PeminjamanRepository} from '../repositories';

export class PeminjamanController {
  constructor(
    @repository(PeminjamanRepository)
    public peminjamanRepository : PeminjamanRepository,
  ) {}

  @post('/peminjaman')
  @response(200, {
    description: 'Peminjaman model instance',
    content: {'application/json': {schema: getModelSchemaRef(Peminjaman)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peminjaman, {
            title: 'NewPeminjaman',
            exclude: ['id'],
          }),
        },
      },
    })
    peminjaman: Omit<Peminjaman, 'id'>,
  ): Promise<Peminjaman> {
    return this.peminjamanRepository.create(peminjaman);
  }

  @get('/peminjaman/count')
  @response(200, {
    description: 'Peminjaman model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Peminjaman) where?: Where<Peminjaman>,
  ): Promise<Count> {
    return this.peminjamanRepository.count(where);
  }

  @get('/peminjaman')
  @response(200, {
    description: 'Array of Peminjaman model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Peminjaman, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Peminjaman) filter?: Filter<Peminjaman>,
  ): Promise<Peminjaman[]> {
    return this.peminjamanRepository.find(filter);
  }

  @patch('/peminjaman')
  @response(200, {
    description: 'Peminjaman PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peminjaman, {partial: true}),
        },
      },
    })
    peminjaman: Peminjaman,
    @param.where(Peminjaman) where?: Where<Peminjaman>,
  ): Promise<Count> {
    return this.peminjamanRepository.updateAll(peminjaman, where);
  }

  @get('/peminjaman/{id}')
  @response(200, {
    description: 'Peminjaman model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Peminjaman, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Peminjaman, {exclude: 'where'}) filter?: FilterExcludingWhere<Peminjaman>
  ): Promise<Peminjaman> {
    return this.peminjamanRepository.findById(id, filter);
  }

  @patch('/peminjaman/{id}')
  @response(204, {
    description: 'Peminjaman PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peminjaman, {partial: true}),
        },
      },
    })
    peminjaman: Peminjaman,
  ): Promise<void> {
    await this.peminjamanRepository.updateById(id, peminjaman);
  }

  @put('/peminjaman/{id}')
  @response(204, {
    description: 'Peminjaman PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() peminjaman: Peminjaman,
  ): Promise<void> {
    await this.peminjamanRepository.replaceById(id, peminjaman);
  }

  @del('/peminjaman/{id}')
  @response(204, {
    description: 'Peminjaman DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.peminjamanRepository.deleteById(id);
  }
}
