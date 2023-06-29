import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../../pessoas/infra/typeorm/entities/Pessoa';
import { IPessoaRepository } from '../domain/repositories/IPessoaRepository';
import { compare } from 'bcryptjs';
import { Secret, sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  login: string;
  senha: string;
}

interface IResponse {
  pessoa: Pessoa;
  token: string;
}
@injectable()
export default class CreateSessionService {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository,
  ) {}

  public async execute({ login, senha }: IRequest): Promise<IResponse> {
    const pessoa = await this.pessoaRepository.findByLogin(login);

    if (!pessoa) {
      throw new AppError('login/senha incorretos', 401);
    }

    const passwordConfirmed = await compare(senha, pessoa.senha);

    if (!passwordConfirmed) {
      throw new AppError('login/senha incorretos', 401);
    }

    const codigoPessoaAsString = String(pessoa.codigoPessoa);

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: codigoPessoaAsString,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      pessoa,
      token,
    };
  }
}
