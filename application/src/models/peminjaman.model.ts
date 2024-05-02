import {Entity, belongsTo, model, property} from '@loopback/repository';
import { Anggota, AnggotaWithRelations } from './anggota.model';
import { Buku, BukuWithRelations } from './buku.model';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'peminjaman'},
    foreignKeys: {
      fk_anggota_anggotaId: {
        name: 'id_anggota',
        entity: 'anggota',
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
export class Peminjaman extends Entity {
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
    postgresql: {
      columnName: 'tanggal_peminjaman',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nulltables: 'No',
    }
  })
  tanggal_peminjaman: Date;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'tanggal_pengembalian',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nulltables: 'No',
    }
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

  constructor(data?: Partial<Peminjaman>) {
    super(data);
  }
}

export interface PeminjamanRelations {
  // describe navigational properties here
  anggota?: AnggotaWithRelations[];
  buku?: BukuWithRelations[];
}

export type PeminjamanWithRelations = Peminjaman & PeminjamanRelations;
