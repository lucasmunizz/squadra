import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreatePessoaService from '../../../services/CreatePessoaService';
import ValidateBairroService from '../../../../enderecos/services/ValidateEnderecoService';

export default class MunicipioController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, sobrenome, idade, login, senha, status, enderecos } =
      request.body;

    const createPessoaService = container.resolve(CreatePessoaService);

    const validateEnderecoService = new ValidateBairroService();

    validateEnderecoService.validateInput(enderecos);

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
