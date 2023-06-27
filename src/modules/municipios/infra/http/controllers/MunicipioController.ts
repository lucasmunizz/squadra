import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateMunicipioService from '../../../services/CreateMunicipioService';

export default class MunicipioController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { codigoUF, nome, status } = request.body;

    const createMunicipioService = container.resolve(CreateMunicipioService);

    const municipio = await createMunicipioService.execute({
      codigoUF,
      nome,
      status,
    });

    console.log(municipio);

    return response.json(municipio);
  }
}
