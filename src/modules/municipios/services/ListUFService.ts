import UF from '../infra/typeorm/entities/Municipio';
import { IMunicipioRepository } from '../domain/repositories/IMunicipioRepository';
import { inject, injectable } from 'tsyringe';
import { IUFRepository } from '../../ufs/domain/repositories/IUFRepository';

interface IRequest {
  codigoMunicipio: number;
  codigoUF: number;
  nome: any;
  status: number;
}

@injectable()
export default class ListMunicipioService {
  constructor(
    @inject('UFRepository')
    private ufsRepository: IUFRepository,
    @inject('MunicipioRepository')
    private municipioRepository: IMunicipioRepository,
  ) {}

  public async execute({
    codigoMunicipio,
    codigoUF,
    nome,
    status,
  }: IRequest): Promise<UF[]> {
    const queryBuilder =
      this.municipioRepository.createQueryBuilder('municipio');

    if (!codigoMunicipio && !codigoUF && !nome && !status) {
      const municipios = await this.municipioRepository.find();
      return municipios;
    }

    if (codigoUF) {
      queryBuilder.where('municipio.codigoUF = :codigoUF', { codigoUF });
    }

    if (status) {
      queryBuilder.where('municipio.status = :status', { status });
    }
    if (nome) {
      queryBuilder.andWhere('municipio.nome LIKE :nome', { nome: `%${nome}%` });
    }
    if (codigoMunicipio) {
      queryBuilder.andWhere('municipio.codigoMunicipio = :codigoMunicipio', {
        codigoMunicipio,
      });
    }

    const municipios = await queryBuilder.getMany();

    return municipios;
  }
}
