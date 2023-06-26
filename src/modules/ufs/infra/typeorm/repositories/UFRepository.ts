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
    const user = this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return user;
  }

  public async findByAcronym(sigla: string): Promise<UF | undefined> {
    const uf = this.ormRepository.findOne({
      where: {
        sigla,
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

  public async findByStatus(status: string): Promise<UF | undefined> {
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
