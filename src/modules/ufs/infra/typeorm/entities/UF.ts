import { IUF } from '../../../../ufs/domain/models/IUF';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default UF;
