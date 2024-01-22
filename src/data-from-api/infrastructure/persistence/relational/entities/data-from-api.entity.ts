import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'data_collection',
})
export class DataEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'jsonb', nullable: true })
  data: object | null;

  @Column({ type: String, nullable: true })
  domain: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
