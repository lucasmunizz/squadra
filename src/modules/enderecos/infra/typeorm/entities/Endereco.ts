import { IEndereco } from '../../../domain/models/IEndereco';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Bairro from '../../../../bairros/infra/typeorm/entities/Bairro';
import Pessoa from '../../../../pessoas/infra/typeorm/entities/Pessoa';

@Entity('TB_ENDERECO')
class Endereco implements IEndereco {
  @PrimaryGeneratedColumn()
  codigoEndereco: number;

  @Column()
  codigoPessoa: number;

  @Column()
  codigoBairro: number;

  @Column()
  nomeRua: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column()
  cep: string;

  @ManyToOne(() => Bairro, bairro => bairro.codigoBairro, {
    onDelete: 'CASCADE',
  })
  bairro: Bairro;

  @ManyToOne(() => Pessoa, pessoa => pessoa.codigoPessoa, {
    onDelete: 'CASCADE',
  })
  pessoa: Pessoa;
  enderecoEntity: Promise<Bairro | undefined>;
}

export default Endereco;
