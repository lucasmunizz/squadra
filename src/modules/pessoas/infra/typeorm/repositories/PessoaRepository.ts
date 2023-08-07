import {
  QueryRunner,
  Repository,
  SelectQueryBuilder,
  getRepository,
} from 'typeorm';
import Pessoa from '../entities/Pessoa';

import { IPessoaRepository } from '../../../domain/repositories/IPessoaRepository';
import { ICreatePessoa } from '../../../domain/models/ICreatePessoa';
import Endereco from '../../../../enderecos/infra/typeorm/entities/Endereco';

class PessoaRepository implements IPessoaRepository {
  private ormRepository: Repository<Pessoa>;

  constructor() {
    this.ormRepository = getRepository(Pessoa);
  }

  public async findByName(nome: string): Promise<Pessoa | undefined> {
    const pessoa = this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return pessoa;
  }

  public async findByLogin(login: string): Promise<Pessoa | undefined> {
    const pessoa = this.ormRepository.findOne({
      where: {
        login,
      },
    });

    return pessoa;
  }

  public async findByCode(codigoPessoa: number): Promise<Pessoa | undefined> {
    const pessoa = this.ormRepository.findOne({
      where: {
        codigoPessoa,
      },
    });

    return pessoa;
  }

  public async findByStatus(status: string): Promise<Pessoa | undefined> {
    const pessoa = this.ormRepository.findOne({
      where: {
        status,
      },
    });

    return pessoa;
  }

  public async create({
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
  }: ICreatePessoa): Promise<Pessoa> {
    const pessoa = this.ormRepository.create({
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
    });

    await this.ormRepository.save(pessoa);

    return pessoa;
  }

  public async save(pessoa: Pessoa): Promise<Pessoa> {
    await this.ormRepository.save(pessoa);

    return pessoa;
  }

  public async find(): Promise<Pessoa[]> {
    const pessoa = await this.ormRepository.find();

    return pessoa;
  }

  public async findWithUF(): Promise<Pessoa[]> {
    const pessoa = await this.ormRepository.find({
      relations: ['uf'],
    });

    return pessoa;
  }

  public async findWithAddress(
    codigoPessoa: number,
  ): Promise<Pessoa | undefined> {
    const pessoa = this.ormRepository.findOne(codigoPessoa, {
      relations: [
        'enderecos',
        'enderecos.bairro',
        'enderecos.bairro.municipio',
        'enderecos.bairro.municipio.uf',
      ],
    });

    return pessoa;
  }

  public async findWithAddressAndStatus(
    codigoPessoa: number,
    status: number,
  ): Promise<Pessoa | undefined> {
    const pessoa = this.ormRepository.findOne({
      where: {
        codigoPessoa,
        status,
      },
      relations: [
        'enderecos',
        'enderecos.bairro',
        'enderecos.bairro.municipio',
        'enderecos.bairro.municipio.uf',
      ],
    });

    return pessoa;
  }

  public async findWithAddressAndLogin(
    codigoPessoa: number,
    login: string,
  ): Promise<Pessoa | undefined> {
    const pessoa = this.ormRepository.findOne({
      where: {
        codigoPessoa,
        login,
      },
      relations: [
        'enderecos',
        'enderecos.bairro',
        'enderecos.bairro.municipio',
        'enderecos.bairro.municipio.uf',
      ],
    });

    return pessoa;
  }

  public async remove(pessoa: Pessoa): Promise<void> {
    await this.ormRepository.remove(pessoa);
  }

  public createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Pessoa> {
    const queryBuilder = this.ormRepository.createQueryBuilder('pessoa');
    return queryBuilder;
  }
}

export default PessoaRepository;
