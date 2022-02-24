/* eslint-disable import/prefer-default-export */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePius1644714317583 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pius',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'content', type: 'varchar' },
          { name: 'user_id', type: 'uuid' },
          { name: 'likes', type: 'integer' },
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
        foreignKeys: [{
          name: 'PiuOwner',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pius');
  }
}
