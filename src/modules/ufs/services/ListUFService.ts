import UF from '../infra/typeorm/entities/UF';
import { IUFRepository } from '../domain/repositories/IUFRepository';
import { inject, injectable } from 'tsyringe';
import { ICreateUF } from '../domain/models/ICreateUF';

interface IRequest {
  codigoUF: number;
  sigla: any;
  nome: any;
  status: number;
}

@injectable()
export default class ListUFService {
  constructor(
    @inject('UFRepository')
    private ufsRepository: IUFRepository,
  ) {}

  public async execute({
    codigoUF,
    sigla,
    nome,
    status,
  }: IRequest): Promise<UF[] | UF> {
    const queryBuilder = this.ufsRepository.createQueryBuilder('uf');

    if (codigoUF) {
      queryBuilder.andWhere('uf.codigoUF = :codigoUF', { codigoUF });
    }

    if (sigla) {
      queryBuilder.andWhere('uf.sigla = :sigla', { sigla });
    }

    if (nome) {
      queryBuilder.andWhere('uf.nome = :nome', { nome });
    }

    if (status) {
      queryBuilder.andWhere('uf.status = :status', { status });
    }

    const ufs = await queryBuilder.getMany();

    // Verificar se há apenas um resultado e retornar o objeto diretamente
    if (ufs.length === 1) {
      return ufs[0];
    }

    return ufs;

    // if (!codigoUF && !status && !nome && !sigla) {
    //   const ufs = await this.ufsRepository.find();
    //   return ufs;
    // }

    // if (codigoUF && !status && !nome && !sigla) {
    //   const ufs = await this.ufsRepository.findByCode(codigoUF);
    //   if (!ufs) {
    //     return [];
    //   }

    //   return ufs;
    // }

    // if (codigoUF && !status && nome && !sigla) {
    //   const ufs = await this.ufsRepository.findByCodeAndName(codigoUF, nome);
    //   if (!ufs) {
    //     return [];
    //   }

    //   return ufs;
    // }

    // if (codigoUF && !status && !nome && sigla) {
    //   const ufs = await this.ufsRepository.findByCodeAndAcronym(
    //     codigoUF,
    //     sigla,
    //   );
    //   if (!ufs) {
    //     return [];
    //   }

    //   return ufs;
    // }

    // if (!codigoUF && !status && nome && sigla) {
    //   const ufs = await this.ufsRepository.findByAcronymAndName(nome, sigla);
    //   if (!ufs) {
    //     return [];
    //   }

    //   return ufs;
    // }

    // if (codigoUF && !status && nome && sigla) {
    //   const ufs = await this.ufsRepository.findByCodeAndAcronymAndName(
    //     codigoUF,
    //     nome,
    //     sigla,
    //   );
    //   if (!ufs) {
    //     return [];
    //   }

    //   return ufs;
    // }

    // if (codigoUF && status && nome && sigla) {
    //   const ufs = await this.ufsRepository.findByCodeAndAcronymAndNameAndStatus(
    //     codigoUF,
    //     nome,
    //     sigla,
    //     status,
    //   );
    //   if (!ufs) {
    //     return [];
    //   }

    //   return ufs;
    // }

    // if (!codigoUF && status && nome && sigla) {
    //   const ufs = await this.ufsRepository.findByAcronymAndNameAndStatus(
    //     sigla,
    //     nome,
    //     status,
    //   );
    //   if (!ufs) {
    //     return [];
    //   }

    //   return ufs;
    // }

    // if (!codigoUF && status && !nome && sigla) {
    //   const ufs = await this.ufsRepository.findByAcronymAndStatus(
    //     sigla,
    //     status,
    //   );
    //   if (!ufs) {
    //     return [];
    //   }

    //   return ufs;
    // }

    // if (codigoUF && status && !nome && !sigla) {
    //   const ufs = await this.ufsRepository.findByCodeAndStatus(
    //     codigoUF,
    //     status,
    //   );
    //   if (!ufs) {
    //     return [];
    //   }

    //   return ufs;
    // }

    // if (!codigoUF && status && nome && !sigla) {
    //   const ufs = await this.ufsRepository.findByNameAndStatus(nome, status);
    //   if (!ufs) {
    //     return [];
    //   }

    //   return ufs;
    // }

    // if (codigoUF && status && !nome && sigla) {
    //   const ufs = await this.ufsRepository.findByCodeAndAcronymAndStatus(
    //     codigoUF,
    //     sigla,
    //     status,
    //   );
    //   if (!ufs) {
    //     return [];
    //   }

    //   return ufs;
    // }

    // if (codigoUF && status && nome && !sigla) {
    //   const ufs = await this.ufsRepository.findByCodeAndNameAndStatus(
    //     codigoUF,
    //     nome,
    //     status,
    //   );
    //   if (!ufs) {
    //     return [];
    //   }

    //   return ufs;
    // }

    // if (codigoUF) {
    //   queryBuilder.where('uf.codigoUF = :codigoUF', { codigoUF });
    // }

    // if (status) {
    //   queryBuilder.where('uf.status = :status', { status });
    // }
    // if (nome) {
    //   queryBuilder.andWhere('uf.nome LIKE :nome', { nome: `%${nome}%` });
    // }
    // if (sigla) {
    //   queryBuilder.andWhere('uf.sigla = :sigla', { sigla });
    // }

    // const ufs = await queryBuilder.getMany();

    // if (codigoUF && !status && !nome && sigla && ufs.length > 0) {
    //   return ufs[0];
    // }

    // if (codigoUF && status && !nome && sigla && ufs.length > 0) {
    //   return ufs[0];
    // }

    // if (codigoUF && !status && !nome && !sigla && ufs.length > 0) {
    //   return ufs[0];
    // }

    // if (!codigoUF && !status && !nome && sigla && ufs.length > 0) {
    //   return ufs[0];
    // }

    // if (!codigoUF && !status && nome && !sigla && ufs.length > 0) {
    //   return ufs[0];
    // }

    return ufs;
  }
}
