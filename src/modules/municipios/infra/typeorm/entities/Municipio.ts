import UF from '../../../../ufs/infra/typeorm/entities/UF';
import { IMunicipio } from '../../../domain/models/IMunicipio';
import Bairro from '../../../../bairros/infra/typeorm/entities/Bairro';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('TB_MUNICIPIO')
class Municipio implements IMunicipio {
  @PrimaryGeneratedColumn()
  codigoMunicipio: number;

  @Column()
  codigoUF: number;

  @Column()
  nome: string;

  @Column()
  status: number;

  @ManyToOne(() => UF, uf => uf.codigoUF, {
    onDelete: 'CASCADE',
  })
  uf: UF;

  @OneToMany(() => Bairro, bairro => bairro.municipio)
  bairros: Bairro[];
}

export default Municipio;
