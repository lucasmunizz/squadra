import AppError from '../../../shared/errors/AppError';
import { IUpdateMunicipio } from '../domain/models/IUpdateMunicipio';

export default class ValidateMunicipioService {
  public validate({
    codigoMunicipio,
    codigoUF,
    nome,
    status,
  }: IUpdateMunicipio): void {
    if (!codigoMunicipio) {
      throw new AppError('O campo codigoMunicipio é obrigatório');
    }

    if (!codigoUF) {
      throw new AppError('O campo codigoUF é obrigatório');
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

    if (typeof codigoUF !== 'number') {
      throw new AppError('O campo codigoUF deve ser um número');
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
