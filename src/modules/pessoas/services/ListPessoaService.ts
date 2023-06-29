import { IPessoaRepository } from '../domain/repositories/IPessoaRepository';
import { inject, injectable } from 'tsyringe';
import Pessoa from '../infra/typeorm/entities/Pessoa';

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
    if (codigoPessoa && !login && !status) {
      const pessoa = await this.pessoaRepository.findWithAddress(codigoPessoa);

      if (pessoa) {
        return pessoa;
      } else {
        return [];
      }
    } else {
      // Montar a consulta base
      const queryBuilder = this.pessoaRepository
        .createQueryBuilder('pessoa')
        .leftJoinAndSelect('pessoa.enderecos', 'endereco')
        .leftJoin('endereco.bairro', 'bairro')
        .leftJoin('bairro.municipio', 'municipio')
        .leftJoin('municipio.uf', 'uf');

      // Adicionar cláusulas de filtro ao Query Builder
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

      // Executar a consulta
      const pessoas = await queryBuilder.getMany();

      // Remover os detalhamentos dos endereços
      const pessoasComEnderecosVazios = pessoas.map(pessoa => {
        const pessoaComEnderecoVazio = { ...pessoa, enderecos: [] };
        return pessoaComEnderecoVazio;
      });

      return pessoasComEnderecosVazios;
    }
  }
}
