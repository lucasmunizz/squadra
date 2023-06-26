import AppError from '../../../shared/errors/AppError';
import UF from '../infra/typeorm/entities/UF';
import { ICreateUF } from '../domain/models/ICreateUF';
import { IUFRepository } from '../domain/repositories/IUFRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateUFService {
  constructor(
    @inject('UFRepository')
    private ufsRepository: IUFRepository,
  ) {}

  public async execute({ sigla, nome, status }: ICreateUF): Promise<UF> {
    const ufExists = await this.ufsRepository.findByAcronym(sigla);

    if (ufExists) {
      throw new AppError('UF já cadastrada com essa sigla.');
    }

    const uf = await this.ufsRepository.create({
      sigla,
      nome,
      status,
    });

    return uf;
  }
}
