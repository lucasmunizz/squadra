import { IBairro } from '../../../domain/models/IBairro';
import Municipio from '../../../../municipios/infra/typeorm/entities/Municipio';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Endereco from '../../../../enderecos/infra/typeorm/entities/Endereco';

@Entity('TB_BAIRRO')
class Bairro implements IBairro {
  @PrimaryGeneratedColumn()
  codigoBairro: number;

  @Column()
  codigoMunicipio: number;

  @Column()
  nome: string;

  @Column()
  status: number;

  @ManyToOne(() => Municipio, municipio => municipio.codigoMunicipio, {
    onDelete: 'CASCADE',
  })
  municipio: Municipio;

  @OneToMany(() => Endereco, endereco => endereco.pessoa, {
    onDelete: 'CASCADE',
  })
  enderecos: Endereco[];
}

export default Bairro;
