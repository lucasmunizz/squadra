import AppError from '../../../shared/errors/AppError';
import { ICreateMunicipio } from '../domain/models/ICreateMunicipio';

export default class ValidateMunicipioService {
  public validate({ codigoUF, nome, status }: ICreateMunicipio): void {
    if (!codigoUF) {
      throw new AppError('O campo codigoUF é obrigatório');
    }

    if (!nome) {
      throw new AppError('O campo nome é obrigatório');
    }

    if (!status) {
      throw new AppError('O campo status é obrigatório');
    }

    if (typeof codigoUF !== 'number') {
      throw new AppError('O campo codigoUF deve ser um número');
    }

    if (typeof nome !== 'string') {
      throw new AppError('O campo codigoUF deve ser um texto');
    }

    if (typeof status !== 'number') {
      throw new AppError('O campo codigoUF deve ser um número');
    }
  }
}
