/* eslint-disable import/prefer-default-export */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PiuFavorite1645153098846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'piu_favorite',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'piu_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'UserFavorite',
            referencedTableName: 'users', // tabela que vamos comparar com essa
            referencedColumnNames: ['id'], // coluna que vamos comparar da outra tabela
            columnNames: ['user_id'], // coluna dessa tabela que vamos comparar
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'PiuFavorite',
            referencedTableName: 'pius',
            referencedColumnNames: ['id'],
            columnNames: ['piu_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('piu_favorite');
  }
}
