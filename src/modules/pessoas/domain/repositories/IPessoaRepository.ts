import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import Pessoa from '../../infra/typeorm/entities/Pessoa';
import { IPessoa } from '../models/IPessoa';
import { ICreatePessoa } from '../models/ICreatePessoa';
import UF from '../../../ufs/infra/typeorm/entities/UF';

export interface IPessoaRepository {
  find(): Promise<Pessoa[]>;
  findWithUF(): Promise<Pessoa[]>;
  findByName(name: string): Promise<Pessoa | undefined>;
  findByStatus(email: string): Promise<Pessoa | undefined>;
  findByCode(code: number): Promise<Pessoa | undefined>;
  //findMunicipioUF(nome: string, codigoUF: UF): Promise<Pessoa | undefined>;
  create(data: ICreatePessoa): Promise<Pessoa>;
  save(uf: IPessoa): Promise<Pessoa>;
  remove(uf: IPessoa): Promise<void>;
  createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Pessoa>;
}
