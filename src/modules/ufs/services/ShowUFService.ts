import UF from '../infra/typeorm/entities/UF';
import { IUFRepository } from '../domain/repositories/IUFRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

@injectable()
export default class ShowUFService {
  constructor(
    @inject('UFRepository')
    private ufsRepository: IUFRepository,
  ) {}

  public async execute(codigo_uf: number): Promise<UF> {
    const uf = await this.ufsRepository.findByCode(codigo_uf);

    if (!uf) {
      throw new AppError('UF não encontrada');
    }

    return uf;
  }
}
