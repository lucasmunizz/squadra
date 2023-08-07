import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import Pessoa from '../../infra/typeorm/entities/Pessoa';
import { IPessoa } from '../models/IPessoa';
import { ICreatePessoa } from '../models/ICreatePessoa';
import UF from '../../../ufs/infra/typeorm/entities/UF';

export interface IPessoaRepository {
  find(): Promise<Pessoa[]>;
  findByLogin(login: string): Promise<Pessoa | undefined>;
  findByName(name: string): Promise<Pessoa | undefined>;
  findByStatus(email: string): Promise<Pessoa | undefined>;
  findByCode(code: number): Promise<Pessoa | undefined>;
  //findMunicipioUF(nome: string, codigoUF: UF): Promise<Pessoa | undefined>;
  create(data: ICreatePessoa): Promise<Pessoa>;
  save(pessoa: IPessoa): Promise<Pessoa>;
  remove(pessoa: IPessoa): Promise<void>;
  createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Pessoa>;
  findWithAddress(codigoPessoa: number): Promise<Pessoa | undefined>;
  findWithAddressAndLogin(
    codigoPessoa: number,
    login: string,
  ): Promise<Pessoa | undefined>;
  findWithAddressAndStatus(
    codigoPessoa: number,
    status: number,
  ): Promise<Pessoa | undefined>;
}
