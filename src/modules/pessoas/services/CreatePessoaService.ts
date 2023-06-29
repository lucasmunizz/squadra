import { IPessoaRepository } from '../domain/repositories/IPessoaRepository';
import { inject, injectable } from 'tsyringe';
import Pessoa from '../infra/typeorm/entities/Pessoa';
import { ICreatePessoa } from '../domain/models/ICreatePessoa';
import ValidatePessoaService from './ValidatePessoaService';
import AppError from '../../../shared/errors/AppError';
import { IEnderecoRepository } from '../../enderecos/domain/repositories/IEnderecoRepository';
import { hash } from 'bcryptjs';
import Endereco from 'src/modules/enderecos/infra/typeorm/entities/Endereco';
import CreateEnderecoService from '../../enderecos/services/CreateEnderecoService';
import { container } from 'tsyringe';

interface IRequest {
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
  enderecos: Endereco[];
}

@injectable()
export default class CreatePessoaService {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository,
    @inject('EnderecoRepository')
    private enderecoRepository: IEnderecoRepository,
  ) {}

  public async execute({
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
    enderecos,
  }: IRequest): Promise<Pessoa[]> {
    const validator = new ValidatePessoaService();

    validator.validate({
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
    });

    const loginExists = await this.pessoaRepository.findByLogin(login);

    if (loginExists) {
      throw new AppError('Não foi possível cadastrar, o login já está em uso');
    }

    const hashedPassword = await hash(senha, 8);

    const pessoa = await this.pessoaRepository.create({
      nome,
      sobrenome,
      idade,
      login,
      senha: hashedPassword,
      status,
    });

    console.log(pessoa.nome);

    const createEnderecoService = container.resolve(CreateEnderecoService);

    const enderecosPessoa = await createEnderecoService.execute({
      enderecos,
      pessoa,
    });

    pessoa.enderecos = enderecosPessoa;

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

    console.log(pessoa);

    return pessoasSemEnderecos;
  }
}
