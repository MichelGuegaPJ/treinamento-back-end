import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users_following_users')
class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usersId_1: string;

  @Column()
  usersId_2: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Follow;
