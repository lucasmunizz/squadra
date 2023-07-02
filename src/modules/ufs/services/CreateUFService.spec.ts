import 'reflect-metadata';
import FakeUFRepository from '../domain/repositories/fakes/FakeUFRepository';
import CreateUFService from './CreateUFService';
import AppError from '../../../shared/errors/AppError';

describe('CreateUF', () => {
  it('should be able to create a UF', async () => {
    const fakeUFRepository = new FakeUFRepository();
    const createUFService = new CreateUFService(fakeUFRepository);

    const uf = await createUFService.execute({
      sigla: 'SP',
      nome: 'São Paulo',
      status: 1,
    });

    expect(uf[0]).toHaveProperty('codigoUF');
  });

  it('should not able to create two UFs with same acronym ', async () => {
    const fakeUFRepository = new FakeUFRepository();
    const createUFService = new CreateUFService(fakeUFRepository);

    await createUFService.execute({
      sigla: 'SP',
      nome: 'São Paulo',
      status: 1,
    });

    expect(
      createUFService.execute({
        sigla: 'SP',
        nome: 'São Paulo',
        status: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
