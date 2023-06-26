import UF from '../../infra/typeorm/entities/UF';
import { ICreateUF } from '../models/ICreateUF';
import { IUF } from '../models/IUF';

export interface IUFRepository {
  find(): Promise<UF[]>;
  findByName(name: string): Promise<UF | undefined>;
  findByAcronym(id: string): Promise<UF | undefined>;
  findByStatus(email: string): Promise<UF | undefined>;
  findByCode(code: number): Promise<UF | undefined>;
  create(data: ICreateUF): Promise<UF>;
  save(uf: IUF): Promise<UF>;
  remove(uf: IUF): Promise<void>;
}
