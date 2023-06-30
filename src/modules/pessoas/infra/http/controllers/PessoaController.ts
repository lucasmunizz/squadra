import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreatePessoaService from '../../../services/CreatePessoaService';
import UpdatePessoaService from '../../../services/UpdatePessoaService';
import ValidateEnderecoService from '../../../../enderecos/services/ValidateEnderecoService';
import ListPessoaService from '../../../services/ListPessoaService';
import DeletePessoaService from '../../../services/DeletePessoaService';

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

    const validateEnderecoService = container.resolve(ValidateEnderecoService);

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

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      codigoPessoa,
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      enderecos,
    } = request.body;

    const updatePessoaService = container.resolve(UpdatePessoaService);

    const validateEnderecoService = container.resolve(ValidateEnderecoService);

    await validateEnderecoService.validateInput(enderecos);

    const pessoa = await updatePessoaService.execute({
      codigoPessoa,
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
  public async delete(request: Request, response: Response): Promise<Response> {
    const codigoPessoa = Number(request.params.codigoPessoa);

    const deletePessoaService = container.resolve(DeletePessoaService);

    await deletePessoaService.execute(codigoPessoa);

    return response.json([]);
  }
}
