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
import {Anggota} from '../models';
import {AnggotaRepository} from '../repositories';

export class AnggotaController {
  constructor(
    @repository(AnggotaRepository)
    public anggotaRepository : AnggotaRepository,
  ) {}

  @post('/anggotas')
  @response(200, {
    description: 'Anggota model instance',
    content: {'application/json': {schema: getModelSchemaRef(Anggota)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Anggota, {
            title: 'NewAnggota',
            exclude: ['id'],
          }),
        },
      },
    })
    anggota: Omit<Anggota, 'id'>,
  ): Promise<Anggota> {
    return this.anggotaRepository.create(anggota);
  }

  @get('/anggotas/count')
  @response(200, {
    description: 'Anggota model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Anggota) where?: Where<Anggota>,
  ): Promise<Count> {
    return this.anggotaRepository.count(where);
  }

  @get('/anggotas')
  @response(200, {
    description: 'Array of Anggota model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Anggota, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Anggota) filter?: Filter<Anggota>,
  ): Promise<Anggota[]> {
    return this.anggotaRepository.find(filter);
  }

  @patch('/anggotas')
  @response(200, {
    description: 'Anggota PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Anggota, {partial: true}),
        },
      },
    })
    anggota: Anggota,
    @param.where(Anggota) where?: Where<Anggota>,
  ): Promise<Count> {
    return this.anggotaRepository.updateAll(anggota, where);
  }

  @get('/anggotas/{id}')
  @response(200, {
    description: 'Anggota model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Anggota, {includeRelations: false}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Anggota, {exclude: 'where'}) filter?: FilterExcludingWhere<Anggota>
  ): Promise<Anggota> {
    return this.anggotaRepository.findById(id, filter);
  }

  @patch('/anggotas/{id}')
  @response(204, {
    description: 'Anggota PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Anggota, {partial: true}),
        },
      },
    })
    anggota: Anggota,
  ): Promise<void> {
    await this.anggotaRepository.updateById(id, anggota);
  }

  @put('/anggotas/{id}')
  @response(204, {
    description: 'Anggota PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() anggota: Anggota,
  ): Promise<void> {
    await this.anggotaRepository.replaceById(id, anggota);
  }

  @del('/anggotas/{id}')
  @response(204, {
    description: 'Anggota DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.anggotaRepository.deleteById(id);
  }
}
