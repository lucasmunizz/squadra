import UF from '../../../ufs/infra/typeorm/entities/UF';

export interface IMunicipio {
  codigoMunicipio: number;
  codigoUF: number;
  nome: string;
  status: number;
  uf: UF;
}
