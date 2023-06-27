import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import Municipio from '../../infra/typeorm/entities/Municipio';
import { IMunicipio } from '../models/IMunicipio';
import { ICreateMunicipio } from '../models/ICreateMunicipio';

export interface IMunicipioRepository {
  find(): Promise<Municipio[]>;
  findByName(name: string): Promise<Municipio | undefined>;
  findByStatus(email: string): Promise<Municipio | undefined>;
  findByCode(code: number): Promise<Municipio | undefined>;
  create(data: ICreateMunicipio): Promise<Municipio>;
  save(uf: IMunicipio): Promise<Municipio>;
  remove(uf: IMunicipio): Promise<void>;
  createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Municipio>;
}
