import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import Bairro from '../../infra/typeorm/entities/Bairro';
import { ICreateBairro } from '../models/ICreateBairro';
import Municipio from '../../../municipios/infra/typeorm/entities/Municipio';

export interface IBairroRepository {
  findByName(nome: string): Promise<Bairro | undefined>;

  findByCode(codigoBairro: number): Promise<Bairro | undefined>;

  findByStatus(status: string): Promise<Bairro | undefined>;

  create({ codigoMunicipio, nome, status }: ICreateBairro): Promise<Bairro>;

  save(bairro: Bairro): Promise<Bairro>;
  find(): Promise<Bairro[]>;

  findWithMunicipio(): Promise<Bairro[]>;

  findBairroMunicipio(
    nome: string,
    codigoMunicipio: Municipio,
  ): Promise<Bairro | undefined>;

  remove(bairro: Bairro): Promise<void>;

  createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Bairro>;
}
