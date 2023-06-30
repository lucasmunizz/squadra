import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListBairroService from '../../../services/ListBairroService';
import CreateBairroService from '../../../services/CreateBairroService';
import UpdateBairroService from '../../../services/UpdateBairroService';
import DeleteBairroService from '../../../services/DeleteBairroService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { codigoBairro, codigoMunicipio, nome, status } = request.body;

    const updateBairroService = container.resolve(UpdateBairroService);

    const bairro = await updateBairroService.execute({
      codigoBairro,
      codigoMunicipio,
      nome,
      status,
    });

    return response.json(bairro);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const codigoBairro = Number(request.params.codigoBairro);

    const deleteBairroService = container.resolve(DeleteBairroService);

    await deleteBairroService.execute(codigoBairro);

    return response.json([]);
  }
}
