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
  Author,
  Buku,
} from '../models';
import {AuthorRepository} from '../repositories';

export class AuthorBukuController {
  constructor(
    @repository(AuthorRepository) protected authorRepository: AuthorRepository,
  ) { }

  @get('/authors/{id}/bukus', {
    responses: {
      '200': {
        description: 'Array of Author has many Buku',
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
    return this.authorRepository.bukus(id).find(filter);
  }

  @post('/authors/{id}/bukus', {
    responses: {
      '200': {
        description: 'Author model instance',
        content: {'application/json': {schema: getModelSchemaRef(Buku)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Author.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buku, {
            title: 'NewBukuInAuthor',
            exclude: ['id'],
            optional: ['authorId']
          }),
        },
      },
    }) buku: Omit<Buku, 'id'>,
  ): Promise<Buku> {
    return this.authorRepository.bukus(id).create(buku);
  }

  @patch('/authors/{id}/bukus', {
    responses: {
      '200': {
        description: 'Author.Buku PATCH success count',
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
    return this.authorRepository.bukus(id).patch(buku, where);
  }

  @del('/authors/{id}/bukus', {
    responses: {
      '200': {
        description: 'Author.Buku DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Buku)) where?: Where<Buku>,
  ): Promise<Count> {
    return this.authorRepository.bukus(id).delete(where);
  }
}
