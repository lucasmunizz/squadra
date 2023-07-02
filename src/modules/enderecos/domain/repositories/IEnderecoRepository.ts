import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import Endereco from '../../infra/typeorm/entities/Endereco';
import { IEndereco } from '../models/IEndereco';
import { ICreateEndereco } from '../models/ICreateEndereco';

export interface IEnderecoRepository {
  find(): Promise<Endereco[]>;
  findByName(name: string): Promise<Endereco | undefined>;
  findByCode(code: number): Promise<Endereco | undefined>;
  create(data: ICreateEndereco): Promise<Endereco>;
  save(endereco: IEndereco): Promise<Endereco>;
  remove(endereco: IEndereco): Promise<void>;
  createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Endereco>;
  delete(codigoEndereco: number): Promise<void>;
}
