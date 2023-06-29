import Endereco from '../../../enderecos/infra/typeorm/entities/Endereco';

export interface ICreatePessoa {
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
}
