import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListBairroService from '../../../services/ListBairroService';
import CreateBairroService from '../../../services/CreateBairroService';

export default class MunicipioController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listBairroService = container.resolve(ListBairroService);

    const codigoBairro = Number(request.query.codigoBairro);

    const codigoMunicipio = Number(request.query.codigoMunicipio);

    const { nome } = request.query;

    const status = Number(request.query.status);

    const municipios = await listBairroService.execute({
      codigoBairro,
      codigoMunicipio,
      nome,
      status,
    });

    return response.json(municipios);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { codigoMunicipio, nome, status } = request.body;

    const createBairroService = container.resolve(CreateBairroService);

    const bairro = await createBairroService.execute({
      codigoMunicipio,
      nome,
      status,
    });

    return response.json(bairro);
  }
}
