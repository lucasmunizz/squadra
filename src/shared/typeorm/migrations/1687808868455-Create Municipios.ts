import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMunicipios1687808868455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'TB_MUNICIPIO',
        columns: [
          {
            name: 'codigoMunicipio',
            type: 'number',
            isPrimary: true,
            generationStrategy: 'increment',
            length: '9',
          },
          {
            name: 'codigoUF',
            type: 'number',
            length: '9',
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '256',
          },
          {
            name: 'status',
            type: 'number',
            length: '3',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'TB_MUNICIPIO',
      new TableForeignKey({
        name: 'municipiosUFs',
        columnNames: ['codigoUF'],
        referencedTableName: 'TB_UF',
        referencedColumnNames: ['codigoUF'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('TB_MUNICIPIO');
  }
}
