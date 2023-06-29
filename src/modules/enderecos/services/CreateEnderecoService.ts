import { inject, injectable } from 'tsyringe';
import Endereco from '../infra/typeorm/entities/Endereco';
import AppError from '../../../shared/errors/AppError';
import { IEnderecoRepository } from '../../enderecos/domain/repositories/IEnderecoRepository';

import Pessoa from '../../pessoas/infra/typeorm/entities/Pessoa';
import { IBairroRepository } from '../../bairros/domain/repositories/IBairroRepository';

interface IRequest {
  enderecos: Endereco[];
  pessoa: Pessoa;
}

@injectable()
export default class CreateEnderecoService {
  constructor(
    @inject('EnderecoRepository')
    private enderecoRepository: IEnderecoRepository,
    @inject('BairroRepository')
    private bairroRepository: IBairroRepository,
  ) {}

  public async execute({ enderecos, pessoa }: IRequest): Promise<Endereco[]> {
    const enderecosEntities = await Promise.all(
      enderecos.map(async endereco => {
        const { codigoBairro, nomeRua, numero, complemento, cep } = endereco;

        const bairroExists = await this.bairroRepository.findByCode(
          codigoBairro,
        );

        if (!bairroExists) {
          throw new AppError(
            'Não existe nenhum bairro com esse código cadastrado',
          );
        }

        const enderecoEntity = await this.enderecoRepository.create({
          codigoPessoa: pessoa.codigoPessoa,
          codigoBairro,
          nomeRua,
          numero,
          complemento,
          cep,
        });
        enderecoEntity.pessoa = pessoa;
        enderecoEntity.bairro = bairroExists;

        await this.enderecoRepository.save(enderecoEntity);

        return enderecoEntity;
      }),
    );

    return enderecosEntities;
  }
}
