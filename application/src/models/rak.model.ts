import {Entity, model, property, hasMany} from '@loopback/repository';
import {Buku, BukuWithRelations} from './buku.model';

@model({settings: {
  postgresql: {schema: 'public', table: 'rak'}
}})
export class Rak extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
    postgresql: {
      columnName: 'id',
      datatype: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nulltables: 'No'
    }
  })
  id?: number;
  
  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'kode_rak',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nulltables: 'No',
    }
  })
  kode_rak: string;

  @hasMany(() => Buku)
  bukus: Buku[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Rak>) {
    super(data);
  }
}

export interface RakRelations {
  // describe navigational properties here
  buku?: BukuWithRelations[];
}

export type RakWithRelations = Rak & RakRelations;
