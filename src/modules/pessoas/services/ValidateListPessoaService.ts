import AppError from '../../../shared/errors/AppError';

interface IRequest {
  codigoPessoa: number;
  login: string;
  status: number;
}

export default class ValidatePessoaService {
  public validate({ codigoPessoa, login, status }: IRequest): void {
    if (codigoPessoa.toLocaleString().length === 0) {
      if (isNaN(codigoPessoa)) {
        throw new AppError(
          'Não foi possível consultar pessoa no banco de dados, o campo codigoPessoa deve ser um número',
        );
      }
    }

    if (login) {
      if (typeof login !== 'string') {
        throw new AppError(
          'Não foi possível consultar pessoa no banco de dados, o campo login deve ser um número',
        );
      }
    }

    if (status) {
      if (isNaN(status)) {
        throw new AppError(
          'Não foi possível consultar pessoa no banco de dados, o campo status deve ser um número',
        );
      }
    }
  }
}
