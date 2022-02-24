/* eslint-disable import/prefer-default-export */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFollowing1645209576856 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_following_users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'usersId_1',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'usersId_2',
            type: 'uuid',
            isPrimary: true,
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
            name: 'UserKey',
            referencedTableName: 'users', // tabela que vamos comparar com essa
            referencedColumnNames: ['id'], // coluna que vamos comparar da outra tabela
            columnNames: ['usersId_1'], // coluna dessa tabela que vamos comparar
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FollowingKey',
            referencedTableName: 'users', // tabela que vamos comparar com essa
            referencedColumnNames: ['id'], // coluna que vamos comparar da outra tabela
            columnNames: ['usersId_2'], // coluna dessa tabela que vamos comparar
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_following_users');
  }
}
