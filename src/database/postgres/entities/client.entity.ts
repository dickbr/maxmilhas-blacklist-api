import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Blacklist } from "./blacklist.entity";

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column() 
  name!: string;

  @Column() 
  cpf!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at?: Date;

  @OneToOne(() => Blacklist, blacklist => blacklist.client, { createForeignKeyConstraints: false })
  @JoinColumn({referencedColumnName: 'client_id'})
  blacklist?: Blacklist;

}