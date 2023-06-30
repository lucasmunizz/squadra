import UF from '../../../infra/typeorm/entities/UF';
import { IUFRepository } from '../../../domain/repositories/IUFRepository';
import { ICreateUF } from '../../../domain/models/ICreateUF';

class FakeUFRepository
  implements Omit<IUFRepository, 'remove' | 'createQueryBuilder' | 'find'>
{
  private ufs: UF[] = [];

  public async findByName(nome: string): Promise<UF | undefined> {
    const uf = this.ufs.find(uf => uf.nome === nome);

    return uf;
  }

  public async findByAcronym(sigla: string): Promise<UF | undefined> {
    const uf = this.ufs.find(uf => uf.sigla === sigla);

    return uf;
  }

  public async findByCode(codigoUF: number): Promise<UF | undefined> {
    const uf = this.ufs.find(uf => uf.codigoUF === codigoUF);

    return uf;
  }

  public async findByStatus(status: number): Promise<UF | undefined> {
    const uf = this.ufs.find(uf => uf.status === status);

    return uf;
  }

  public async create({ sigla, nome, status }: ICreateUF): Promise<UF> {
    const uf = new UF();

    uf.codigoUF = Math.floor(Math.random() * 10) + 1;
    uf.sigla = sigla;
    uf.nome = nome;
    uf.status = status;

    this.ufs.push(uf);

    return uf;
  }

  public async save(uf: UF): Promise<UF> {
    Object.assign(this.ufs, uf);

    return uf;
  }
}

export default FakeUFRepository;
