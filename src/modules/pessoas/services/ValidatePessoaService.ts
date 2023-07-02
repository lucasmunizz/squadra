import AppError from '../../../shared/errors/AppError';

interface IRequest {
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
}

export default class ValidatePessoaService {
  public validate({
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
  }: IRequest): void {
    if (!nome) {
      throw new AppError('O campo nome é obrigatório');
    }
    if (!sobrenome) {
      throw new AppError('O campo sobrenome é obrigatório');
    }
    if (!idade) {
      throw new AppError('O campo idade é obrigatório');
    }
    if (!login) {
      throw new AppError('O campo login é obrigatório');
    }
    if (!senha) {
      throw new AppError('O campo senha é obrigatório');
    }
    if (!status) {
      throw new AppError('O campo status é obrigatório');
    }

    if (typeof nome !== 'string') {
      throw new AppError('O campo nome deve ser um texto');
    }
    if (typeof sobrenome !== 'string') {
      throw new AppError('O campo sobrenome deve ser um texto');
    }
    if (typeof idade !== 'number') {
      throw new AppError('O campo idade deve ser um número');
    }

    if (typeof login !== 'string') {
      throw new AppError('O campo login deve ser um texto');
    }

    if (typeof senha !== 'string') {
      throw new AppError('O campo senha deve ser um texto');
    }

    if (typeof status !== 'number') {
      throw new AppError('O campo status deve ser um número');
    }
  }
}
