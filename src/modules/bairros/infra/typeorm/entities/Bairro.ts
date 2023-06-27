import { IBairro } from '../../../domain/models/IBairro';
import Municipio from '../../../../municipios/infra/typeorm/entities/Municipio';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Bairro;
