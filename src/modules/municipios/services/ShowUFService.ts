import UF from '../infra/typeorm/entities/Municipio';
import { IUFRepository } from '../domain/repositories/IMunicipioRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

@injectable()
export default class ShowUFService {
  constructor(
    @inject('UFRepository')
    private ufsRepository: IUFRepository,
  ) {}

  public async execute(codigoUF: number, status: number): Promise<UF> {
    const uf = await this.ufsRepository.findByCode(codigoUF);

    console.log(status);

    if (status) {
      const queryBuilder = this.ufsRepository
        .createQueryBuilder('uf')
        .where('uf.status = :status', { status });
      const st = await queryBuilder.getMany();
    }

    if (!uf) {
      throw new AppError('UF não encontrada');
    }

    return uf;
  }
}
