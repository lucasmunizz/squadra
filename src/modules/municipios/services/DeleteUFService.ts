import { IUFRepository } from '../domain/repositories/IMunicipioRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

@injectable()
export default class DeleteUFService {
  constructor(
    @inject('UFRepository')
    private ufsRepository: IUFRepository,
  ) {}

  public async execute(codigoUF: number): Promise<void> {
    const uf = await this.ufsRepository.findByCode(codigoUF);

    if (!uf) {
      throw new AppError('UF não encontrada');
    }

    await this.ufsRepository.remove(uf);
  }
}
