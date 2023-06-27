import { IBairroRepository } from '../domain/repositories/IBairroRepository';
import { inject, injectable } from 'tsyringe';
import Bairro from '../infra/typeorm/entities/Bairro';

interface IRequest {
  codigoBairro: number;
  codigoMunicipio: number;
  nome: any;
  status: number;
}

@injectable()
export default class ListBairroService {
  constructor(
    @inject('BairroRepository')
    private bairroRepository: IBairroRepository,
  ) {}

  public async execute({
    codigoBairro,
    codigoMunicipio,
    nome,
    status,
  }: IRequest): Promise<Bairro | Bairro[]> {
    const queryBuilder = this.bairroRepository.createQueryBuilder('bairro');

    if (!codigoBairro && !codigoMunicipio && !nome && !status) {
      const municipios = await this.bairroRepository.find();
      return municipios;
    }

    if (codigoBairro) {
      queryBuilder.where('bairro.codigoBairro = :codigoBairro', {
        codigoBairro,
      });
    }

    if (status) {
      queryBuilder.where('bairro.status = :status', { status });
    }
    if (nome) {
      queryBuilder.andWhere('bairro.nome LIKE :nome', { nome: `%${nome}%` });
    }
    if (codigoMunicipio) {
      queryBuilder.andWhere('bairro.codigoMunicipio = :codigoMunicipio', {
        codigoMunicipio,
      });
    }

    const bairros = await queryBuilder.getMany();

    if (
      codigoBairro &&
      !codigoMunicipio &&
      !nome &&
      !status &&
      bairros.length > 0
    ) {
      return bairros[0];
    } else {
      return bairros;
    }
  }
}
