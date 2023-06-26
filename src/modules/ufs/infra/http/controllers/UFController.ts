import { Request, Response } from 'express';

import CreateUFService from '../../../services/CreateUFService';
import { container } from 'tsyringe';
import ListUFService from '../../../services/ListUFService';
import ShowUFService from '../../../services/ShowUFService';
import UpdateUFService from '../../../services/UpdateUFService';
import DeleteUFService from '../../../services/DeleteUFService';

export default class UFController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUFService = container.resolve(ListUFService);

    const ufs = await listUFService.execute();

    return response.json(ufs);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const codigoUF = Number(request.params.codigoUF);

    console.log(codigoUF, typeof codigoUF);

    const showUFService = container.resolve(ShowUFService);

    const customers = await showUFService.execute(codigoUF);

    return response.json(customers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { sigla, nome, status } = request.body;

    const createUFService = container.resolve(CreateUFService);

    console.log(sigla, nome, status);

    await createUFService.execute({ sigla, nome, status });

    const listUFService = container.resolve(ListUFService);

    const ufs = await listUFService.execute();

    return response.json(ufs);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { codigoUF, sigla, nome, status } = request.body;

    const updateUFService = container.resolve(UpdateUFService);

    const uf = await updateUFService.execute({
      codigoUF,
      sigla,
      nome,
      status,
    });

    return response.json(uf);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const codigoUF = Number(request.params.codigoUF);

    const deleteUFService = container.resolve(DeleteUFService);

    await deleteUFService.execute(codigoUF);

    return response.json([]);
  }
}
