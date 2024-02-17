import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entity";

@Entity('blacklist')
export class Blacklist {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()  
  cpf!: string;

  @Column({type: `uuid`, nullable: true})
  client_id?: string
   
  @CreateDateColumn({ type: 'timestamptz' })
  created_at?: Date;

  @OneToOne(() => Client, client => client.blacklist)
  @JoinColumn({name: 'client_id',})
  client?: Client;
}