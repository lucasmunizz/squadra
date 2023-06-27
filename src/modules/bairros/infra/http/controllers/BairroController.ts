import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListBairroService from '../../../services/ListBairroService';

export default class MunicipioController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listBairroService = container.resolve(ListBairroService);

    const codigoBairro = Number(request.query.codigoUF);

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
}
