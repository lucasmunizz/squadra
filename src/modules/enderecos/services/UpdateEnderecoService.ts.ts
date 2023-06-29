import { inject, injectable } from 'tsyringe';
import Endereco from '../infra/typeorm/entities/Endereco';
import AppError from '../../../shared/errors/AppError';
import { IEnderecoRepository } from '../domain/repositories/IEnderecoRepository';

import Pessoa from '../../pessoas/infra/typeorm/entities/Pessoa';
import { IBairroRepository } from '../../bairros/domain/repositories/IBairroRepository';

interface IRequest {
  enderecos: Endereco[];
  pessoa: Pessoa;
}

@injectable()
export default class UpdateEnderecoService {
  constructor(
    @inject('EnderecoRepository')
    private enderecoRepository: IEnderecoRepository,
    @inject('BairroRepository')
    private bairroRepository: IBairroRepository,
  ) {}

  public async execute({ enderecos, pessoa }: IRequest): Promise<Endereco[]> {
    const enderecosAtualizados: Endereco[] = [];

    for (const endereco of enderecos) {
      const {
        codigoEndereco,
        codigoBairro,
        nomeRua,
        numero,
        complemento,
        cep,
      } = endereco;

      if (codigoEndereco) {
        const bairroExists = await this.bairroRepository.findByCode(
          codigoBairro,
        );

        if (!bairroExists) {
          throw new AppError('Não há nenhum bairro cadastrado com esse código');
        }

        const enderecoExists = await this.enderecoRepository.findByCode(
          codigoEndereco,
        );

        if (!enderecoExists) {
          throw new AppError(
            'Não há nenhum endereço cadastrado com esse código',
          );
        }

        enderecoExists.nomeRua = nomeRua;
        enderecoExists.numero = numero;
        enderecoExists.complemento = complemento;
        enderecoExists.cep = cep;
        enderecoExists.pessoa = pessoa;
        enderecoExists.bairro = bairroExists;

        const enderecoAtualizado = await this.enderecoRepository.save(
          enderecoExists,
        );

        enderecosAtualizados.push(enderecoAtualizado);
      } else {
        const bairroExists = await this.bairroRepository.findByCode(
          codigoBairro,
        );

        if (!bairroExists) {
          throw new AppError('Não há nenhum bairro cadastrado com esse código');
        }

        const newAddress = await this.enderecoRepository.create({
          codigoPessoa: pessoa.codigoPessoa,
          codigoBairro,
          nomeRua,
          numero,
          complemento,
          cep,
        });

        newAddress.pessoa = pessoa;
        newAddress.bairro = bairroExists;

        await this.enderecoRepository.save(newAddress);

        enderecosAtualizados.push(newAddress);
      }
    }

    if (pessoa.enderecos) {
      pessoa.enderecos.forEach(async (endereco: Endereco) => {
        if (
          !enderecos ||
          !enderecos.some(
            (e: Endereco) => e.codigoEndereco === endereco.codigoEndereco,
          )
        ) {
          await this.enderecoRepository.remove(endereco);
        }
      });
    }

    return enderecosAtualizados;
  }
}
