import { IPessoaRepository } from '../domain/repositories/IPessoaRepository';
import { inject, injectable } from 'tsyringe';
import Pessoa from '../infra/typeorm/entities/Pessoa';
import { ICreatePessoa } from '../domain/models/ICreatePessoa';
import ValidatePessoaService from './ValidatePessoaService';
import AppError from '../../../shared/errors/AppError';
import { IEnderecoRepository } from '../../enderecos/domain/repositories/IEnderecoRepository';
import { hash } from 'bcryptjs';
import Endereco from 'src/modules/enderecos/infra/typeorm/entities/Endereco';
import UpdateEnderecoService from '../../enderecos/services/UpdateEnderecoService.ts';
import { container } from 'tsyringe';
import ValidateEnderecoService from '../../enderecos/services/ValidateEnderecoService';

interface IRequest {
  codigoPessoa: number;
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
  enderecos: Endereco[];
}

@injectable()
export default class UpdatePessoaService {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository,
    @inject('EnderecoRepository')
    private enderecoRepository: IEnderecoRepository,
  ) {}

  public async execute({
    codigoPessoa,
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
    enderecos,
  }: IRequest): Promise<Pessoa[]> {
    const validateEnderecoService = container.resolve(ValidateEnderecoService);

    await validateEnderecoService.validateInput(enderecos);

    const validator = new ValidatePessoaService();

    if (!codigoPessoa) {
      throw new AppError('O campo codigoPessoa é obrigatório');
    }

    if (typeof codigoPessoa !== 'number') {
      throw new AppError('O campo codigoPessoa deve ser um número');
    }

    validator.validate({
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
    });

    const pessoaExists = await this.pessoaRepository.findByCode(codigoPessoa);

    if (!pessoaExists) {
      throw new AppError(
        'Não existe nenhuma pessoa cadastrada com esse código',
      );
    }

    const loginExists = await this.pessoaRepository.findByLogin(login);

    if (loginExists && pessoaExists.codigoPessoa !== loginExists.codigoPessoa) {
      throw new AppError('Não foi possível alterar, o login já está em uso');
    }

    const hashedPassword = await hash(senha, 8);

    pessoaExists.nome = nome;
    pessoaExists.sobrenome = sobrenome;
    pessoaExists.idade = idade;
    pessoaExists.login = login;
    pessoaExists.senha = hashedPassword;
    pessoaExists.status = status;

    const pessoa = await this.pessoaRepository.save(pessoaExists);

    const updateEnderecoService = container.resolve(UpdateEnderecoService);

    const enderecosAtualizados = await updateEnderecoService.execute({
      enderecos,
      pessoa,
    });

    pessoa.enderecos = enderecosAtualizados;

    await this.pessoaRepository.save(pessoa);

    const pessoas = await this.pessoaRepository.find();

    const pessoasSemEnderecos = pessoas.map(pessoa => {
      const { codigoPessoa, nome, sobrenome, idade, login, senha, status } =
        pessoa;
      return {
        codigoPessoa,
        nome,
        sobrenome,
        idade,
        login,
        senha,
        status,
        enderecos: [],
      };
    });

    return pessoasSemEnderecos;
  }
}
