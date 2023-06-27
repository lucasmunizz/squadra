import UF from 'src/modules/ufs/infra/typeorm/entities/UF';

export interface ICreateMunicipio {
  codigoUF: number;
  nome: string;
  status: number;
}
