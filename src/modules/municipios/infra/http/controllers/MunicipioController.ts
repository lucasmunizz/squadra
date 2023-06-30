import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateMunicipioService from '../../../services/CreateMunicipioService';

import ListMunicipioService from '../../../services/ListMunicipioService';

import UpdateMunicipioService from '../../../services/UpdateMunicipioService';

import DeleteMunicipioService from '../../../services/DeleteMunicipioService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { codigoMunicipio, codigoUF, nome, status } = request.body;

    const updateMunicipioService = container.resolve(UpdateMunicipioService);

    const municipio = await updateMunicipioService.execute({
      codigoMunicipio,
      codigoUF,
      nome,
      status,
    });

    return response.json(municipio);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const codigoMunicipio = Number(request.params.codigoMunicipio);

    const deleteUFService = container.resolve(DeleteMunicipioService);

    await deleteUFService.execute(codigoMunicipio);

    return response.json([]);
  }
}
