import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreatePessoaService from '../../../services/CreatePessoaService';
import ValidateBairroService from '../../../../enderecos/services/ValidateEnderecoService';
import ListPessoaService from '../../../services/ListPessoaService';

export default class MunicipioController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPessoaService = container.resolve(ListPessoaService);

    const codigoPessoa = Number(request.query.codigoPessoa);

    const { login } = request.query;

    const status = Number(request.query.status);

    const pessoas = await listPessoaService.execute({
      codigoPessoa,
      login,
      status,
    });

    return response.json(pessoas);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, sobrenome, idade, login, senha, status, enderecos } =
      request.body;

    const createPessoaService = container.resolve(CreatePessoaService);

    const validateEnderecoService = container.resolve(ValidateBairroService);

    await validateEnderecoService.validateInput(enderecos);

    const pessoa = await createPessoaService.execute({
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      enderecos,
    });

    return response.json(pessoa);
  }
}
