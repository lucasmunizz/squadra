import AppError from '../../../shared/errors/AppError';
import { IValidateEndereco } from '../domain/models/IValidateEndereco';
import Endereco from '../infra/typeorm/entities/Endereco';

export default class ValidateEnderecoService {
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

  public validateInput(enderecos: Endereco[]) {
    enderecos.map(endereco => {
      const { codigoBairro, nomeRua, numero, complemento, cep } = endereco;

      this.validate({
        codigoBairro,
        nomeRua,
        numero,
        complemento,
        cep,
      });
    });
  }
}
