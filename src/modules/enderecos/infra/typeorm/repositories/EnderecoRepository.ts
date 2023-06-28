import {
  QueryRunner,
  Repository,
  SelectQueryBuilder,
  getRepository,
} from 'typeorm';
import Endereco from '../entities/Endereco';
import { IEnderecoRepository } from '../../../domain/repositories/IEnderecoRepository';
import { ICreateEndereco } from '../../../domain/models/ICreateEndereco';

class EnderecoRepository implements IEnderecoRepository {
  private ormRepository: Repository<Endereco>;

  constructor() {
    this.ormRepository = getRepository(Endereco);
  }

  public async findByName(nome: string): Promise<Endereco | undefined> {
    const endereco = this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return endereco;
  }

  public async findByCode(
    codigoEndereco: number,
  ): Promise<Endereco | undefined> {
    const endereco = this.ormRepository.findOne({
      where: {
        codigoEndereco,
      },
    });

    return endereco;
  }

  public async findByStatus(status: string): Promise<Endereco | undefined> {
    const endereco = this.ormRepository.findOne({
      where: {
        status,
      },
    });

    return endereco;
  }

  public async create({
    codigoBairro,
    nomeRua,
    numero,
    complemento,
    cep,
  }: ICreateEndereco): Promise<Endereco> {
    const endereco = this.ormRepository.create({
      codigoBairro,
      nomeRua,
      numero,
      complemento,
      cep,
    });

    await this.ormRepository.save(endereco);

    return endereco;
  }

  public async save(endereco: Endereco): Promise<Endereco> {
    await this.ormRepository.save(endereco);

    return endereco;
  }

  public async find(): Promise<Endereco[]> {
    const endereco = await this.ormRepository.find();

    return endereco;
  }

  public async findWithUF(): Promise<Endereco[]> {
    const endereco = await this.ormRepository.find({
      relations: ['uf'],
    });

    return endereco;
  }

  // public async findMunicipioUF(
  //   nome: string,
  //   codigoUF: UF,
  // ): Promise<Pessoa | undefined> {
  //   const municipio = this.ormRepository.findOne({
  //     where: {
  //       nome,
  //       uf: codigoUF,
  //     },
  //   });

  //   return municipio;
  // }

  public async remove(endereco: Endereco): Promise<void> {
    await this.ormRepository.remove(endereco);
  }

  public createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Endereco> {
    const queryBuilder = this.ormRepository.createQueryBuilder('endereco');
    return queryBuilder;
  }
}

export default EnderecoRepository;
