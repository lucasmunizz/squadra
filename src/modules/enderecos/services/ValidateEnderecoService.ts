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
  }

  public async validateInput(enderecos: Endereco[]) {
    if (!enderecos || enderecos.length === 0) {
      throw new AppError('Pelo menos um endereço é obrigatório');
    }

    await Promise.all(
      enderecos.map(async endereco => {
        const { codigoBairro, nomeRua, numero, complemento, cep } = endereco;

        const bairroExists = await this.bairroRepository.findByCode(
          codigoBairro,
        );

        if (!bairroExists) {
          throw new AppError(
            'Não existe nenhum bairro com esse código cadastrado',
          );
        }

        this.validate({
          codigoBairro,
          nomeRua,
          numero,
          complemento,
          cep,
        });
      }),
    );
  }
}
