import UF from '../infra/typeorm/entities/UF';
import { IUFRepository } from '../domain/repositories/IUFRepository';
import { inject, injectable } from 'tsyringe';
import { ICreateUF } from '../domain/models/ICreateUF';

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
  }: IRequest): Promise<UF[]> {
    const queryBuilder = this.ufsRepository.createQueryBuilder('uf');

    if (!codigoUF && !status && !nome && !sigla) {
      const ufs = await this.ufsRepository.find();
      return ufs;
    }

    if (codigoUF) {
      queryBuilder.where('uf.codigoUF = :codigoUF', { codigoUF });
    }

    if (status) {
      queryBuilder.where('uf.status = :status', { status });
    }
    if (nome) {
      queryBuilder.andWhere('uf.nome LIKE :nome', { nome: `%${nome}%` });
    }
    if (sigla) {
      queryBuilder.andWhere('uf.sigla = :sigla', { sigla });
    }

    const ufs = await queryBuilder.getMany();

    return ufs;
  }
}
