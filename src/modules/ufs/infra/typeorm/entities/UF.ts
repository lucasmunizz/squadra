import Municipio from '../../../../municipios/infra/typeorm/entities/Municipio';
import { IUF } from '../../../../ufs/domain/models/IUF';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TB_UF')
class UF implements IUF {
  @PrimaryGeneratedColumn()
  codigoUF: number;

  @Column()
  sigla: string;

  @Column()
  nome: string;

  @Column()
  status: number;

  @OneToMany(() => Municipio, municipio => municipio.codigoMunicipio)
  municipios: Municipio[];
}

export default UF;
