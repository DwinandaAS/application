import {Entity, belongsTo, model, property} from '@loopback/repository';
import { Anggota, AnggotaWithRelations } from './anggota.model';

@model({settings: {
  postgresql: {schema: 'public', table: 'peminjaman'},
  foreignKeys: {
    fk_anggota_anggotaId: {
      name: 'id_anggota',
      entity: 'anggota',
      entityKey: 'id',
      foreignKey: 'anggotaid'
    }
  }
}})
export class Peminjaman extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  tanggal_peminjaman: string;

  @property({
    type: 'date',
    required: true,
  })
  tanggal_pengembalian: string;

  @belongsTo(() => Anggota)
  anggotaId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Peminjaman>) {
    super(data);
  }
}

export interface PeminjamanRelations {
  anggota?: AnggotaWithRelations
  // describe navigational properties here
}

export type PeminjamanWithRelations = Peminjaman & PeminjamanRelations;
