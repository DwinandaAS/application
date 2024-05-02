import {Entity, model, property} from '@loopback/repository';

@model({settings: {
  postgresql: {schema: 'public', table: 'buku'},
  foreignKeys: {
    fk_pengarang_pengarangId: {
      name: 'id_publisher',
      entity: 'publisher',
      entityKey: 'id',
      foreignKey: 'publisherId'
    },
    fk_author_authorId: {
      name: 'id_author',
      entity: 'author',
      entityKey: 'id',
      foreignKey: 'authorId'
    },
    fk_rak_rakId: {
      name: 'id_rak',
      entity: 'rak',
      entityKey: 'id',
      foreignKey: 'rakId'
    }
  }
}})
export class Buku extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {columnName: 'id',
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
    postgresql: {columnName: 'title',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nulltables: 'No',
    }
  })
  title: string;

  @property({
    type: 'number',
    required: true,
    postgresql: {columnName: 'tahun_terbit',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nulltables: 'No',
    } 
  })
  tahun_terbit: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'jumlah',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nulltables: 'No',
    }
  })
  jumlah: number;

  constructor(data?: Partial<Buku>) {
    super(data);
  }
}

export interface BukuRelations {
  // describe navigational properties here
}

export type BukuWithRelations = Buku & BukuRelations;
