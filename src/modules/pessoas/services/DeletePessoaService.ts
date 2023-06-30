import { IPessoaRepository } from '../domain/repositories/IPessoaRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

@injectable()
export default class DeletePessoaService {
  constructor(
    @inject('UFRepository')
    private pessoaRepository: IPessoaRepository,
  ) {}

  public async execute(codigoPessoa: number): Promise<void> {
    const pessoa = await this.pessoaRepository.findByCode(codigoPessoa);

    if (!pessoa) {
      throw new AppError('Pessoa não encontrada');
    }

    await this.pessoaRepository.remove(pessoa);
  }
}
