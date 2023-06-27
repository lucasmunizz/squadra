import {
  QueryRunner,
  Repository,
  SelectQueryBuilder,
  getRepository,
} from 'typeorm';
import Municipio from '../entities/Municipio';

import { IMunicipioRepository } from '../../../domain/repositories/IMunicipioRepository';
import { ICreateMunicipio } from '../../../domain/models/ICreateMunicipio';
import UF from '../../../../ufs/infra/typeorm/entities/UF';

class MunicipioRepository implements IMunicipioRepository {
  private ormRepository: Repository<Municipio>;

  constructor() {
    this.ormRepository = getRepository(Municipio);
  }

  public async findByName(nome: string): Promise<Municipio | undefined> {
    const municipio = this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return municipio;
  }

  public async findByCode(codigoUF: number): Promise<Municipio | undefined> {
    const municipio = this.ormRepository.findOne({
      where: {
        codigoUF,
      },
    });

    return municipio;
  }

  public async findByStatus(status: string): Promise<Municipio | undefined> {
    const municipio = this.ormRepository.findOne({
      where: {
        status,
      },
    });

    return municipio;
  }

  public async create({
    codigoUF,
    nome,
    status,
  }: ICreateMunicipio): Promise<Municipio> {
    const municipio = this.ormRepository.create({
      codigoUF,
      nome,
      status,
    });

    await this.ormRepository.save(municipio);

    return municipio;
  }

  public async save(municipio: Municipio): Promise<Municipio> {
    await this.ormRepository.save(municipio);

    return municipio;
  }

  public async find(): Promise<Municipio[]> {
    const municipios = await this.ormRepository.find();

    return municipios;
  }

  public async findWithUF(): Promise<Municipio[]> {
    const municipios = await this.ormRepository.find({
      relations: ['uf'],
    });

    return municipios;
  }

  public async findMunicipioUF(
    nome: string,
    codigoUF: UF,
  ): Promise<Municipio | undefined> {
    const municipio = this.ormRepository.findOne({
      where: {
        nome,
        uf: codigoUF,
      },
    });

    return municipio;
  }

  public async remove(municipio: Municipio): Promise<void> {
    await this.ormRepository.remove(municipio);
  }

  public createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Municipio> {
    const queryBuilder = this.ormRepository.createQueryBuilder('uf');
    return queryBuilder;
  }
}

export default MunicipioRepository;
