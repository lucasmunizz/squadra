import UF from '../infra/typeorm/entities/UF';
import { IUFRepository } from '../domain/repositories/IUFRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IUF } from '../domain/models/IUF';
import ValidateUFService from './ValidateUpdateUFService';

@injectable()
export default class UpdateUFService {
  constructor(
    @inject('UFRepository')
    private ufsRepository: IUFRepository,
  ) {}

  public async execute({ codigoUF, sigla, nome, status }: IUF): Promise<UF[]> {
    const validator = new ValidateUFService();

    validator.validate({ codigoUF, sigla, nome, status });

    const uf = await this.ufsRepository.findByCode(codigoUF);

    if (!uf) {
      throw new AppError('UF não encontrada.');
    }

    const ufNameExists = await this.ufsRepository.findByName(nome);

    if (ufNameExists && nome !== uf.nome) {
      throw new AppError('Já existe uma UF com esse nome');
    }

    const ufAcronymExists = await this.ufsRepository.findByAcronym(sigla);

    if (ufAcronymExists && sigla !== uf.sigla) {
      throw new AppError('Já existe uma UF com essa sigla');
    }

    uf.sigla = sigla;
    uf.nome = nome;
    uf.status = status;

    await this.ufsRepository.save(uf);

    const ufs = await this.ufsRepository.find();

    return ufs;
  }
}
