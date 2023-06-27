import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTudo1687885528656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'TB_UF',
        columns: [
          {
            name: 'codigoUF',
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

    await queryRunner.query(
      `CREATE TABLE "TB_MUNICIPIO" ("codigoMunicipio" number GENERATED BY DEFAULT AS IDENTITY, "codigoUF" number NOT NULL, "nome" varchar2(255) NOT NULL, "status" number NOT NULL, "ufCodigoUF" number, CONSTRAINT "PK_8060f658695f5edde4224ad8810" PRIMARY KEY ("codigoMunicipio"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "TB_MUNICIPIO" ADD CONSTRAINT "FK_5b5882a1b1425786cb4793857bc" FOREIGN KEY ("ufCodigoUF") REFERENCES "TB_UF" ("codigoUF") ON DELETE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "TB_MUNICIPIO" DROP CONSTRAINT "FK_5b5882a1b1425786cb4793857bc"`,
    );
    await queryRunner.query(`DROP TABLE "TB_MUNICIPIO"`);

    await queryRunner.dropTable('TB_UF');
  }
}
