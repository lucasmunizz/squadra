import AppError from '../../../shared/errors/AppError';
import { ICreateBairro } from '../domain/models/ICreateBairro';

export default class ValidateBairroService {
  public validate({ codigoMunicipio, nome, status }: ICreateBairro): void {
    if (!codigoMunicipio) {
      throw new AppError('O campo codigoMunicipio é obrigatório');
    }

    if (!nome) {
      throw new AppError('O campo nome é obrigatório');
    }

    if (!status) {
      throw new AppError('O campo status é obrigatório');
    }

    if (typeof codigoMunicipio !== 'number') {
      throw new AppError('O campo codigoMunicipio deve ser um número');
    }

    if (typeof nome !== 'string') {
      throw new AppError('O campo nome deve ser um texto');
    }

    if (typeof status !== 'number') {
      throw new AppError('O campo status deve ser um número');
    }

    if (status !== 1 && status !== 2) {
      throw new AppError('O campo status deve ser 1 ou 2');
    }
  }
}
