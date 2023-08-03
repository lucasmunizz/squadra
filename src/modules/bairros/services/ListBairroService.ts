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

    if (!codigoMunicipio && !codigoBairro && !nome && !status) {
      const bairros = await this.bairroRepository.find();
      return bairros;
    }

    if (codigoMunicipio) {
      queryBuilder.where('bairro.codigoMunicipio = :codigoMunicipio', {
        codigoMunicipio,
      });
    }

    if (nome) {
      queryBuilder.andWhere('bairro.nome LIKE :nome', { nome: `%${nome}%` });
    }

    if (codigoBairro) {
      queryBuilder.andWhere('bairro.codigoBairro = :codigoBairro', {
        codigoBairro,
      });

      if (codigoMunicipio) {
        queryBuilder.andWhere('bairro.codigoMunicipio = :codigoMunicipio', {
          codigoMunicipio,
        });
      }
    }

    if (status) {
      queryBuilder.andWhere('bairro.status = :status', { status });
    }

    const bairros = await queryBuilder.getMany();

    if (codigoBairro && bairros.length === 1) {
      return bairros[0];
    }

    return bairros;
  }
}
