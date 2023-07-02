import UF from '../infra/typeorm/entities/UF';
import { IUFRepository } from '../domain/repositories/IUFRepository';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  codigoUF: number;
  sigla: any;
  nome: any;
  status: number;
}

@injectable()
export default class ListUFService {
  constructor(
    @inject('UFRepository')
    private ufsRepository: IUFRepository,
  ) {}

  public async execute({
    codigoUF,
    sigla,
    nome,
    status,
  }: IRequest): Promise<UF[] | UF> {
    const queryBuilder = this.ufsRepository.createQueryBuilder('uf');

    if (codigoUF) {
      queryBuilder.andWhere('uf.codigoUF = :codigoUF', { codigoUF });
    }

    if (sigla) {
      queryBuilder.andWhere('uf.sigla = :sigla', { sigla });
    }

    if (nome) {
      queryBuilder.andWhere('uf.nome = :nome', { nome });
    }

    if (status) {
      queryBuilder.andWhere('uf.status = :status', { status });
    }

    const ufs = await queryBuilder.getMany();

    if (ufs.length === 1) {
      return ufs[0];
    }
    return ufs;
  }
}
