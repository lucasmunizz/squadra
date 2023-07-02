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
  findByAcronymAndName(sigla: string, name: string): Promise<UF | undefined>;

  findByCodeAndAcronym(
    codigoUF: number,
    sigla: string,
  ): Promise<UF | undefined>;

  findByCodeAndName(codigoUF: number, nome: string): Promise<UF | undefined>;
  findByCodeAndAcronymAndName(
    codigoUF: number,
    sigla: string,
    name: string,
  ): Promise<UF | undefined>;
  findByCodeAndAcronymAndNameAndStatus(
    codigoUF: number,
    sigla: string,
    nome: string,
    status: number,
  ): Promise<UF | undefined>;

  findByAcronymAndNameAndStatus(
    sigla: string,
    nome: string,
    status: number,
  ): Promise<UF | undefined>;

  findByCodeAndStatus(
    codigoUF: number,
    status: number,
  ): Promise<UF | undefined>;

  findByAcronymAndStatus(
    sigla: string,
    status: number,
  ): Promise<UF | undefined>;

  findByNameAndStatus(nome: string, status: number): Promise<UF | undefined>;
  findByCodeAndAcronymAndStatus(
    codigoUF: number,
    sigla: string,
    status: number,
  ): Promise<UF | undefined>;

  findByCodeAndNameAndStatus(
    codigoUF: number,
    nome: string,
    status: number,
  ): Promise<UF | undefined>;
}
