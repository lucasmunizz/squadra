import UF from '../infra/typeorm/entities/UF';
import { IUFRepository } from '../domain/repositories/IUFRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListUFService {
  constructor(
    @inject('UFRepository')
    private ufsRepository: IUFRepository,
  ) {}

  public async execute(): Promise<UF[]> {
    const ufs = await this.ufsRepository.find();

    return ufs;
  }
}
