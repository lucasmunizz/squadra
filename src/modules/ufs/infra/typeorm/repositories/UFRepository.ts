import {
  QueryRunner,
  Repository,
  SelectQueryBuilder,
  getRepository,
} from 'typeorm';
import UF from '../entities/UF';
import { IUFRepository } from '../../../domain/repositories/IUFRepository';
import { ICreateUF } from '../../../domain/models/ICreateUF';

class UFRepository implements IUFRepository {
  private ormRepository: Repository<UF>;

  constructor() {
    this.ormRepository = getRepository(UF);
  }

  public async findByName(nome: string): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return uf;
  }

  public async findByAcronym(sigla: string): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        sigla,
      },
    });

    return uf;
  }

  public async findByAcronymAndName(
    sigla: string,
    nome: string,
  ): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        sigla,
        nome,
      },
    });

    return uf;
  }
  public async findByCodeAndAcronymAndName(
    codigoUF: number,
    sigla: string,
    nome: string,
  ): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        codigoUF,
        sigla,
        nome,
      },
    });

    return uf;
  }

  public async findByCodeAndAcronymAndNameAndStatus(
    codigoUF: number,
    sigla: string,
    nome: string,
    status: number,
  ): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        codigoUF,
        sigla,
        nome,
        status,
      },
    });

    return uf;
  }

  public async findByAcronymAndNameAndStatus(
    sigla: string,
    nome: string,
    status: number,
  ): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        sigla,
        nome,
        status,
      },
    });

    return uf;
  }

  public async findByCodeAndStatus(
    codigoUF: number,
    status: number,
  ): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        codigoUF,
        status,
      },
    });

    return uf;
  }

  public async findByAcronymAndStatus(
    sigla: string,
    status: number,
  ): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        sigla,
        status,
      },
    });

    return uf;
  }

  public async findByCodeAndAcronymAndStatus(
    codigoUF: number,
    sigla: string,
    status: number,
  ): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        codigoUF,
        sigla,
        status,
      },
    });

    return uf;
  }

  public async findByCodeAndNameAndStatus(
    codigoUF: number,
    nome: string,
    status: number,
  ): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        codigoUF,
        nome,
        status,
      },
    });

    return uf;
  }

  public async findByNameAndStatus(
    nome: string,
    status: number,
  ): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        nome,
        status,
      },
    });

    return uf;
  }

  public async findByCodeAndAcronym(
    codigoUF: number,
    sigla: string,
  ): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        codigoUF,
        sigla,
      },
    });

    return uf;
  }

  public async findByCodeAndName(
    codigoUF: number,
    nome: string,
  ): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        codigoUF,
        nome,
      },
    });

    return uf;
  }

  public async findByCode(codigoUF: number): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        codigoUF,
      },
    });

    return uf;
  }

  public async findByStatus(status: number): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        status,
      },
    });

    return uf;
  }

  public async create({ sigla, nome, status }: ICreateUF): Promise<UF> {
    const uf = this.ormRepository.create({ sigla, nome, status });

    await this.ormRepository.save(uf);

    return uf;
  }

  public async save(uf: UF): Promise<UF> {
    await this.ormRepository.save(uf);

    return uf;
  }

  public async find(): Promise<UF[]> {
    const ufs = await this.ormRepository.find();

    return ufs;
  }

  public async remove(uf: UF): Promise<void> {
    await this.ormRepository.remove(uf);
  }

  public createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<UF> {
    const queryBuilder = this.ormRepository.createQueryBuilder('uf');
    return queryBuilder;
  }
}

export default UFRepository;
