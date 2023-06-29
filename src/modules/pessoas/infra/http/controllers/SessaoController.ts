import { Request, Response } from 'express';
import CreateSessaoService from '../../../services/CreateSessaoService';
import { container } from 'tsyringe';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { login, senha } = request.body;

    const sessionService = await container.resolve(CreateSessaoService);

    const pessoa = await sessionService.execute({ login, senha });

    return response.json(pessoa);
  }
}
