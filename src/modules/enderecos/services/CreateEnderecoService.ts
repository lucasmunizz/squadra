import { IPessoaRepository } from '../../pessoas/domain/repositories/IPessoaRepository';
import { inject, injectable } from 'tsyringe';
import Endereco from '../infra/typeorm/entities/Endereco';
import { ICreateEndereco } from '../domain/models/ICreateEndereco';
import ValidateEnderecoService from './ValidateEnderecoService';
import AppError from '../../../shared/errors/AppError';
import { IEnderecoRepository } from '../../enderecos/domain/repositories/IEnderecoRepository';
import { hash } from 'bcryptjs';
import Pessoa from '../../pessoas/infra/typeorm/entities/Pessoa';
import Bairro from '../../bairros/infra/typeorm/entities/Bairro';
import { IBairroRepository } from '../../bairros/domain/repositories/IBairroRepository';

interface IRequest {
  enderecos: Endereco[];
  pessoa: Pessoa;
}

@injectable()
export default class CreateEnderecoService {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository,
    @inject('EnderecoRepository')
    private enderecoRepository: IEnderecoRepository,
    @inject('BairroRepository')
    private bairroRepository: IBairroRepository,
  ) {}

  public async execute({ enderecos, pessoa }: IRequest): Promise<Endereco[]> {
    if (!enderecos || enderecos.length === 0) {
      throw new AppError('Pelo menos um endereço é obrigatório');
    }

    const validator = new ValidateEnderecoService();

    const enderecosEntities = await Promise.all(
      enderecos.map(async endereco => {
        const { codigoBairro, nomeRua, numero, complemento, cep } = endereco;

        validator.validate({
          codigoBairro,
          nomeRua,
          numero,
          complemento,
          cep,
        });

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
