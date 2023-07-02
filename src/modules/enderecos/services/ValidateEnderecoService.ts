import AppError from '../../../shared/errors/AppError';
import { IValidateEndereco } from '../domain/models/IValidateEndereco';
import Endereco from '../infra/typeorm/entities/Endereco';
import { inject, injectable } from 'tsyringe';
import { IBairroRepository } from '../../bairros/domain/repositories/IBairroRepository';

@injectable()
export default class ValidateEnderecoService {
  constructor(
    @inject('BairroRepository')
    private bairroRepository: IBairroRepository,
  ) {}

  public validate({
    codigoBairro,
    nomeRua,
    numero,
    complemento,
    cep,
  }: IValidateEndereco) {
    if (!codigoBairro) {
      throw new AppError('O campo codigoBairro é obrigatório');
    }

    if (!nomeRua) {
      throw new AppError('O campo nomeRua é obrigatório');
    }
    if (!numero) {
      throw new AppError('O campo numero é obrigatório');
    }
    if (!complemento) {
      throw new AppError('O campo complemento é obrigatório');
    }
    if (!cep) {
      throw new AppError('O campo cep é obrigatório');
    }

    if (typeof codigoBairro !== 'number') {
      throw new AppError('O campo codigoBairro deve ser um texto');
    }

    if (typeof nomeRua !== 'string') {
      throw new AppError('O campo nomeRua deve ser um texto');
    }

    if (typeof numero !== 'string') {
      throw new AppError('O campo numero deve ser um texto');
    }

    if (typeof complemento !== 'string') {
      throw new AppError('O campo complemento deve ser um texto');
    }

    if (typeof complemento !== 'string') {
      throw new AppError('O campo complemento deve ser um texto');
    }

    if (typeof cep !== 'string') {
      throw new AppError('O campo cep deve ser um texto');
    }
  }

  public async validateInput(enderecos: Endereco[]) {
    if (!enderecos || enderecos.length === 0) {
      throw new AppError('Pelo menos um endereço é obrigatório');
    }

    await Promise.all(
      enderecos.map(async endereco => {
        const { codigoBairro, nomeRua, numero, complemento, cep } = endereco;

        this.validate({
          codigoBairro,
          nomeRua,
          numero,
          complemento,
          cep,
        });

        const bairroExists = await this.bairroRepository.findByCode(
          codigoBairro,
        );

        if (!bairroExists) {
          throw new AppError(
            'Não existe nenhum bairro com esse código cadastrado',
          );
        }
      }),
    );
  }
}
