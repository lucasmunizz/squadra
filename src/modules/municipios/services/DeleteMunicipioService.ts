import { IMunicipioRepository } from '../domain/repositories/IMunicipioRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

@injectable()
export default class DeleteMunicipioService {
  constructor(
    @inject('MunicipioRepository')
    private municipioRepository: IMunicipioRepository,
  ) {}

  public async execute(codigoMunicipio: number): Promise<void> {
    const municipio = await this.municipioRepository.findByCode(
      codigoMunicipio,
    );

    if (!municipio) {
      throw new AppError('Municipio não encontrado');
    }

    await this.municipioRepository.remove(municipio);
  }
}
