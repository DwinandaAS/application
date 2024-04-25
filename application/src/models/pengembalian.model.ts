import {Entity, belongsTo, model, property} from '@loopback/repository';
import { Anggota, AnggotaWithRelations } from './anggota.model';

@model({settings: {
  postgresql: {schema: 'public', table: 'pengembalian'},
  foreignKeys: {
    fk_anggota_anggotaId: {
      name: 'id_anggota',
      entity: 'Anggota',
      entityKey: 'id',
      foreignKey: 'id'
    }
  }
}})
export class Pengembalian extends Entity {
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
  tanggal_pengembalian: string;

  @belongsTo(() => Anggota)
  id_anggota: number;
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
  anggota?: AnggotaWithRelations
}

export type PengembalianWithRelations = Pengembalian & PengembalianRelations;
