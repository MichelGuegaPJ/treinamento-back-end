/* eslint-disable import/prefer-default-export */

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RefactLikesInPius1645554595066 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pius', 'likes');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pius',
      new TableColumn({ name: 'likes', type: 'integer' }),
    );
  }
}
