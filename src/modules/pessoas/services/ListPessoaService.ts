import { IPessoaRepository } from '../domain/repositories/IPessoaRepository';
import { inject, injectable } from 'tsyringe';
import Pessoa from '../infra/typeorm/entities/Pessoa';
import ValidatePessoaService from './ValidateListPessoaService';

interface IRequest {
  codigoPessoa: number;
  login: any;
  status: number;
}

@injectable()
export default class ListPessoaService {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository,
  ) {}

  public async execute({
    codigoPessoa,
    login,
    status,
  }: IRequest): Promise<Pessoa[] | Pessoa> {
    const validate = new ValidatePessoaService();

    validate.validate({ codigoPessoa, login, status });

    if (codigoPessoa && !login && !status) {
      const pessoa = await this.pessoaRepository.findWithAddress(codigoPessoa);

      if (pessoa) {
        return pessoa;
      } else {
        return [];
      }
    } else {
      const queryBuilder = this.pessoaRepository
        .createQueryBuilder('pessoa')
        .leftJoinAndSelect('pessoa.enderecos', 'endereco')
        .leftJoin('endereco.bairro', 'bairro')
        .leftJoin('bairro.municipio', 'municipio')
        .leftJoin('municipio.uf', 'uf');

      if (codigoPessoa) {
        queryBuilder.andWhere('pessoa.codigoPessoa = :codigoPessoa', {
          codigoPessoa,
        });
      }

      if (login) {
        queryBuilder.andWhere('pessoa.login = :login', { login });
      }
      if (status) {
        queryBuilder.andWhere('pessoa.status = :status', { status });
      }

      const pessoas = await queryBuilder.getMany();

      const pessoasComEnderecosVazios = pessoas.map(pessoa => {
        const pessoaComEnderecoVazio = { ...pessoa, enderecos: [] };
        return pessoaComEnderecoVazio;
      });

      if (codigoPessoa && pessoasComEnderecosVazios.length === 1) {
        return pessoasComEnderecosVazios[0];
      }

      return pessoasComEnderecosVazios;
    }
  }
}
