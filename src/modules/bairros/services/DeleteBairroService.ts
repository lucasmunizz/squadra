import { IBairroRepository } from '../domain/repositories/IBairroRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

@injectable()
export default class DeleteUFService {
  constructor(
    @inject('BairroRepository')
    private bairroRepository: IBairroRepository,
  ) {}

  public async execute(codigoBairro: number): Promise<void> {
    const bairro = await this.bairroRepository.findByCode(codigoBairro);

    if (!bairro) {
      throw new AppError('Bairro não encontrado');
    }

    await this.bairroRepository.remove(bairro);
  }
}
