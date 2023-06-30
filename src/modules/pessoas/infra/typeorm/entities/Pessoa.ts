import { IPessoa } from '../../../domain/models/IPessoa';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Endereco from '../../../../enderecos/infra/typeorm/entities/Endereco';

@Entity('TB_PESSOA')
class Pessoa implements IPessoa {
  @PrimaryGeneratedColumn()
  codigoPessoa: number;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column()
  idade: number;

  @Column({ unique: true })
  login: string;

  @Column()
  senha: string;

  @Column()
  status: number;

  @OneToMany(() => Endereco, endereco => endereco.pessoa, {
    onDelete: 'CASCADE',
  })
  enderecos: Endereco[];
}

export default Pessoa;
