import {Entity, hasMany, model, property} from '@loopback/repository';
import { Peminjaman, PeminjamanWithRelations } from './peminjaman.model';
import { Pengembalian, PengembalianWithRelations } from './pengembalian.model';

@model({settings: {
  postgresql: {schema: 'public', table: 'anggota'}
}})
export class Anggota extends Entity {
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
    postgresql: {
      columnName: 'name',
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
      columnName: 'gender',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nulltables: 'No',
    }
  })
  gender: string;

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

  @hasMany(() => Peminjaman)
  peminjaman: Peminjaman[]

  @hasMany(() => Pengembalian)
  pengembalians: Pengembalian[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<Anggota>) {
    super(data);
  }
}

export interface AnggotaRelations {
  // describe navigational properties here
  peminjaman?: PeminjamanWithRelations[];
  pengembalian?: PengembalianWithRelations[]
}

export type AnggotaWithRelations = Anggota & AnggotaRelations;
