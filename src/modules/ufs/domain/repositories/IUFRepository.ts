import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import UF from '../../infra/typeorm/entities/UF';
import { ICreateUF } from '../models/ICreateUF';
import { IUF } from '../models/IUF';

export interface IUFRepository {
  find(): Promise<UF[]>;
  findByName(name: string): Promise<UF | undefined>;
  findByAcronym(id: string): Promise<UF | undefined>;
  findByStatus(status: number): Promise<UF | undefined>;
  findByCode(code: number): Promise<UF | undefined>;
  create(data: ICreateUF): Promise<UF>;
  save(uf: IUF): Promise<UF>;
  remove(uf: IUF): Promise<void>;
  createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<UF>;
}
