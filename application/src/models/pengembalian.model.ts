import {Entity, belongsTo, model, property} from '@loopback/repository';
import { Anggota, AnggotaWithRelations } from './anggota.model';
import { Buku, BukuWithRelations } from './buku.model';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'pengembalian'},
    foreignKeys: {
      fk_anggota_anggotaId: {
        name: 'id_anggota',
        entity: 'Anggota',
        entityKey: 'id',
        foreignKey: 'anggotaid'
      },
      fk_buku_bukuId: {
        name: 'id_buku',
        entity: 'buku',
        entityKey: 'id',
        foreignKey: 'bukuid'
      }
    }
  }
})
export class Pengembalian extends Entity {
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
    type: 'date',
    required: true,
    columnName: 'tanggal_pengembalian',
    dataType: 'date',
    dataLength: null,
    dataPrecision: null,
    dataScale: 0,
    nulltables: 'No',
  })
  tanggal_pengembalian: Date;

  @belongsTo(() => Anggota)
  anggotaId: number;

  @belongsTo(() => Buku)
  bukuId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pengembalian>) {
    super(data);
  }
}

export interface PengembalianRelations {
  // describe navigational properties here
  anggota?: AnggotaWithRelations[],
  buku?: BukuWithRelations[]
}

export type PengembalianWithRelations = Pengembalian & PengembalianRelations;
