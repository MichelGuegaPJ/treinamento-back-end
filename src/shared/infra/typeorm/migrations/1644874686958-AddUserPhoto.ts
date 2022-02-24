/* eslint-disable import/prefer-default-export */

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddUserPhoto1644874686958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({ name: 'photo', type: 'varchar', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'photo');
  }
}
