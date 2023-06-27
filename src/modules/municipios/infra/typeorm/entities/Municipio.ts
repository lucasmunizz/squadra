import UF from '../../../../ufs/infra/typeorm/entities/UF';
import { IMunicipio } from '../../../domain/models/IMunicipio';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('TB_MUNICIPIO')
class Municipio implements IMunicipio {
  @PrimaryGeneratedColumn()
  codigoMunicipio: number;

  @ManyToOne(() => Municipio, municipio => municipio.codigoUF)
  @Column()
  codigoUF: number;

  @Column()
  nome: string;

  @Column()
  status: number;
}

export default Municipio;
