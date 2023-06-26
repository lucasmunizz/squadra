import AppError from '../../../shared/errors/AppError';
import UF from '../infra/typeorm/entities/UF';
import { ICreateUF } from '../domain/models/ICreateUF';
import { IUFRepository } from '../domain/repositories/IUFRepository';
import { inject, injectable } from 'tsyringe';
import ValidateUFService from './ValidateUFService';

@injectable()
export default class CreateUFService {
  constructor(
    @inject('UFRepository')
    private ufsRepository: IUFRepository,
  ) {}

  public async execute({ sigla, nome, status }: ICreateUF): Promise<void> {
    const validator = new ValidateUFService();

    validator.validate({ sigla, nome, status });

    const ufExists = await this.ufsRepository.findByAcronym(sigla);

    if (ufExists) {
      throw new AppError('UF já cadastrada com essa sigla.');
    }

    await this.ufsRepository.create({
      sigla,
      nome,
      status,
    });
  }
}