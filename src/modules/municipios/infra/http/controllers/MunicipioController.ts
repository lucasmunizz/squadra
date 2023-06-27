import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateMunicipioService from '../../../services/CreateMunicipioService';

import ListMunicipioService from '../../../services/ListMunicipioService';

export default class MunicipioController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listMunicipioService = container.resolve(ListMunicipioService);

    const codigoMunicipio = Number(request.query.codigoMunicipio);

    const codigoUF = Number(request.query.codigoUF);

    const { nome } = request.query;

    const status = Number(request.query.status);

    const municipios = await listMunicipioService.execute({
      codigoMunicipio,
      codigoUF,
      nome,
      status,
    });

    return response.json(municipios);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { codigoUF, nome, status } = request.body;

    const createMunicipioService = container.resolve(CreateMunicipioService);

    const municipio = await createMunicipioService.execute({
      codigoUF,
      nome,
      status,
    });

    return response.json(municipio);
  }
}
