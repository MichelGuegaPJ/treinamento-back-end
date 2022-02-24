import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import User from '@modules/User/infra/typeorm/entities/User';
import PiuLike from './PiuLikes';

@Entity('pius')
class Piu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @ManyToOne(() => User, (user) => user.pius)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PiuLike, (piuLike) => piuLike.piu)
  likes: PiuLike[];
}

export default Piu;
