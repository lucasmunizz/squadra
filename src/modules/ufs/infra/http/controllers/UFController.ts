import { Request, Response } from 'express';

import CreateUFService from '../../../services/CreateUFService';
import { container } from 'tsyringe';
import ListUFService from '../../../services/ListUFService';
import ShowUFService from '../../../services/ShowUFService';
import UpdateUFService from '../../../services/UpdateUFService';

export default class UFController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUFService = container.resolve(ListUFService);

    const customers = await listUFService.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const codigo_uf = Number(request.params.codigo_uf);

    const showUFService = container.resolve(ShowUFService);

    const customers = await showUFService.execute(codigo_uf);

    return response.json(customers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { sigla, nome, status } = request.body;

    const createUFService = container.resolve(CreateUFService);

    console.log(sigla, nome, status);

    const uf = await createUFService.execute({ sigla, nome, status });

    console.log(sigla, nome, status);

    return response.json(uf);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const codigo_uf = Number(request.params.codigo_uf);

    const { sigla, nome, status } = request.body;

    const updateUFService = container.resolve(UpdateUFService);

    const uf = await updateUFService.execute({
      codigo_uf,
      sigla,
      nome,
      status,
    });

    return response.json(uf);
  }
}
