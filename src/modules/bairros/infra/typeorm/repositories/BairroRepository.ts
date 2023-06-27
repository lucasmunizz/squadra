import {
  QueryRunner,
  Repository,
  SelectQueryBuilder,
  getRepository,
} from 'typeorm';
import Bairro from '../entities/Bairro';

import { IBairroRepository } from '../../../domain/repositories/IBairroRepository';
import { ICreateBairro } from '../../../domain/models/ICreateBairro';
import Municipio from '../../../../municipios/infra/typeorm/entities/Municipio';

class BairroRepository implements IBairroRepository {
  private ormRepository: Repository<Bairro>;

  constructor() {
    this.ormRepository = getRepository(Bairro);
  }

  public async findByName(nome: string): Promise<Bairro | undefined> {
    const bairro = this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return bairro;
  }

  public async findByCode(codigoBairro: number): Promise<Bairro | undefined> {
    const bairro = this.ormRepository.findOne({
      where: {
        codigoBairro,
      },
    });

    return bairro;
  }

  public async findByStatus(status: string): Promise<Bairro | undefined> {
    const bairro = this.ormRepository.findOne({
      where: {
        status,
      },
    });

    return bairro;
  }

  public async create({
    codigoMunicipio,
    nome,
    status,
  }: ICreateBairro): Promise<Bairro> {
    const bairro = this.ormRepository.create({
      codigoMunicipio,
      nome,
      status,
    });

    await this.ormRepository.save(bairro);

    return bairro;
  }

  public async save(bairro: Bairro): Promise<Bairro> {
    await this.ormRepository.save(bairro);

    return bairro;
  }

  public async find(): Promise<Bairro[]> {
    const bairros = await this.ormRepository.find();

    return bairros;
  }

  public async findWithMunicipio(): Promise<Bairro[]> {
    const bairros = await this.ormRepository.find({
      relations: ['municipio'],
    });

    return bairros;
  }

  public async findBairroMunicipio(
    nome: string,
    codigoMunicipio: Municipio,
  ): Promise<Bairro | undefined> {
    const bairro = this.ormRepository.findOne({
      where: {
        nome,
        codigoMunicipio: codigoMunicipio,
      },
    });

    return bairro;
  }

  public async remove(bairro: Bairro): Promise<void> {
    await this.ormRepository.remove(bairro);
  }

  public createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Bairro> {
    const queryBuilder = this.ormRepository.createQueryBuilder('bairro');
    return queryBuilder;
  }
}

export default BairroRepository;
