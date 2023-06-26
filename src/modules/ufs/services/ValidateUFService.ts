import AppError from '../../../shared/errors/AppError';
import { ICreateUF } from '../domain/models/ICreateUF';

export default class ValidateUFService {
  public validate({ sigla, nome, status }: ICreateUF): void {
    if (!sigla) {
      throw new AppError('O campo sigla é obrigatório');
    }

    if (!nome) {
      throw new AppError('O campo nome é obrigatório');
    }

    if (!status) {
      throw new AppError('O campo status é obrigatório');
    }
  }
}
