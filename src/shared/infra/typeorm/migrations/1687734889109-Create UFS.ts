import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUFS1687734889109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'TB_UF',
        columns: [
          {
            name: 'codigo_uf',
            type: 'number',
            isPrimary: true,
            generationStrategy: 'increment',
            length: '9',
          },
          {
            name: 'sigla',
            type: 'varchar',
            length: '2',
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '6',
          },
          {
            name: 'status',
            type: 'number',
            length: '3',
          },
        ],
      }),
    );
  }

  public async down(quersyRunner: QueryRunner): Promise<void> {
    await quersyRunner.dropTable('TB_UF');
  }
}
