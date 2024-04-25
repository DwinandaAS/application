import {Entity, model, property} from '@loopback/repository';

@model({settings: {
  postgresql: {schema: 'public', table: 'rak'}
}})
export class Rak extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  kode_rak: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

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
}

export type RakWithRelations = Rak & RakRelations;
