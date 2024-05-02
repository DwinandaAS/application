import {Entity, model, property, hasMany} from '@loopback/repository';
import {Buku, BukuWithRelations} from './buku.model';

@model({settings: {
  postgresql: {schema: 'public', table: 'publisher'}
}})
export class Publisher extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nulltables: 'No',
    }
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'name',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nulltables: 'No',
    }
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'address',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nulltables: 'No',
    }
  })
  address: string;

  @property({
    type: 'string',
    required: true,
    // limit: 8,
    postgresql: {
      columnName: 'no_hp',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nulltables: 'No',
    }
  })
  no_hp: string;

  @hasMany(() => Buku)
  bukus: Buku[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Publisher>) {
    super(data);
  }
}

export interface PublisherRelations {
  // describe navigational properties here
  buku?: BukuWithRelations[];
}

export type PublisherWithRelations = Publisher & PublisherRelations;
