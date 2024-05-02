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
import {Pengembalian} from '../models';
import {PengembalianRepository} from '../repositories';

export class PengembalianController {
  constructor(
    @repository(PengembalianRepository)
    public pengembalianRepository : PengembalianRepository,
  ) {}

  @post('/pengembalians')
  @response(200, {
    description: 'Pengembalian model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pengembalian)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pengembalian, {
            title: 'NewPengembalian',
            exclude: ['id'],
          }),
        },
      },
    })
    pengembalian: Omit<Pengembalian, 'id'>,
  ): Promise<Pengembalian> {
    return this.pengembalianRepository.create(pengembalian);
  }

  @get('/pengembalians/count')
  @response(200, {
    description: 'Pengembalian model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pengembalian) where?: Where<Pengembalian>,
  ): Promise<Count> {
    return this.pengembalianRepository.count(where);
  }

  @get('/pengembalians')
  @response(200, {
    description: 'Array of Pengembalian model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pengembalian, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pengembalian) filter?: Filter<Pengembalian>,
  ): Promise<Pengembalian[]> {
    return this.pengembalianRepository.find(filter);
  }

  @patch('/pengembalians')
  @response(200, {
    description: 'Pengembalian PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pengembalian, {partial: true}),
        },
      },
    })
    pengembalian: Pengembalian,
    @param.where(Pengembalian) where?: Where<Pengembalian>,
  ): Promise<Count> {
    return this.pengembalianRepository.updateAll(pengembalian, where);
  }

  @get('/pengembalians/{id}')
  @response(200, {
    description: 'Pengembalian model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pengembalian, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pengembalian, {exclude: 'where'}) filter?: FilterExcludingWhere<Pengembalian>
  ): Promise<Pengembalian> {
    return this.pengembalianRepository.findById(id, filter);
  }

  @patch('/pengembalians/{id}')
  @response(204, {
    description: 'Pengembalian PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pengembalian, {partial: true}),
        },
      },
    })
    pengembalian: Pengembalian,
  ): Promise<void> {
    await this.pengembalianRepository.updateById(id, pengembalian);
  }

  @put('/pengembalians/{id}')
  @response(204, {
    description: 'Pengembalian PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pengembalian: Pengembalian,
  ): Promise<void> {
    await this.pengembalianRepository.replaceById(id, pengembalian);
  }

  @del('/pengembalians/{id}')
  @response(204, {
    description: 'Pengembalian DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pengembalianRepository.deleteById(id);
  }
}
