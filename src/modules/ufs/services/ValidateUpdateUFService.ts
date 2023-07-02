import AppError from '../../../shared/errors/AppError';
import { IUpdateUF } from '../domain/models/IUpdateUF';

export default class ValidateCreateUFService {
  public validate({ codigoUF, sigla, nome, status }: IUpdateUF): void {
    if (!codigoUF) {
      throw new AppError('O campo codigoUF é obrigatório');
    }

    if (!sigla) {
      throw new AppError('O campo sigla é obrigatório');
    }

    if (!nome) {
      throw new AppError('O campo nome é obrigatório');
    }

    if (!status) {
      throw new AppError('O campo status é obrigatório');
    }

    if (status !== 1 && status !== 2) {
      throw new AppError('O campo status deve ser 11 ou 2');
    }

    if (typeof sigla !== 'string') {
      throw new AppError('O campo sigla deve ser um texto');
    }

    if (typeof codigoUF !== 'number') {
      throw new AppError('O campo codigoUF deve ser um número');
    }

    if (typeof nome !== 'string') {
      throw new AppError('O campo nome deve ser um texto');
    }

    if (typeof status !== 'number') {
      throw new AppError('O campo status deve ser um número');
    }

    if (sigla.length !== 2) {
      throw new AppError('O campo sigla deve possuir 2 caracteres');
    }
  }
}
