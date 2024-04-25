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
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'number',
    required: true,
  })
  no_hp: number;

  @hasMany(() => Peminjaman)
  peminjaman: Peminjaman[]

  @hasMany(() => Pengembalian)
  pengembalian: Pengembalian[]

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

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
