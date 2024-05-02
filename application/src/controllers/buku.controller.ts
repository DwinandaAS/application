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
import {Buku} from '../models';
import {BukuRepository} from '../repositories';

export class BukuController {
  constructor(
    @repository(BukuRepository)
    public bukuRepository : BukuRepository,
  ) {}

  @post('/bukus')
  @response(200, {
    description: 'Buku model instance',
    content: {'application/json': {schema: getModelSchemaRef(Buku)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buku, {
            title: 'NewBuku',
            exclude: ['id'],
          }),
        },
      },
    })
    buku: Omit<Buku, 'id'>,
  ): Promise<Buku> {
    return this.bukuRepository.create(buku);
  }

  @get('/bukus/count')
  @response(200, {
    description: 'Buku model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Buku) where?: Where<Buku>,
  ): Promise<Count> {
    return this.bukuRepository.count(where);
  }

  @get('/bukus')
  @response(200, {
    description: 'Array of Buku model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Buku, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Buku) filter?: Filter<Buku>,
  ): Promise<Buku[]> {
    return this.bukuRepository.find(filter);
  }

  @patch('/bukus')
  @response(200, {
    description: 'Buku PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buku, {partial: true}),
        },
      },
    })
    buku: Buku,
    @param.where(Buku) where?: Where<Buku>,
  ): Promise<Count> {
    return this.bukuRepository.updateAll(buku, where);
  }

  @get('/bukus/{id}')
  @response(200, {
    description: 'Buku model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Buku, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Buku, {exclude: 'where'}) filter?: FilterExcludingWhere<Buku>
  ): Promise<Buku> {
    return this.bukuRepository.findById(id, filter);
  }

  @patch('/bukus/{id}')
  @response(204, {
    description: 'Buku PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buku, {partial: true}),
        },
      },
    })
    buku: Buku,
  ): Promise<void> {
    await this.bukuRepository.updateById(id, buku);
  }

  @put('/bukus/{id}')
  @response(204, {
    description: 'Buku PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() buku: Buku,
  ): Promise<void> {
    await this.bukuRepository.replaceById(id, buku);
  }

  @del('/bukus/{id}')
  @response(204, {
    description: 'Buku DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bukuRepository.deleteById(id);
  }
}
