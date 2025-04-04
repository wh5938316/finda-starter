import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'jwks', schema: 'auth' })
export class JwksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'public_key' })
  publicKey: string;

  @Column({ name: 'private_key' })
  privateKey: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
