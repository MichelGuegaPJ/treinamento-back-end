import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Piu from '../../../../Piu/infra/typeorm/entities/Pius';
import PiuLike from '../../../../Piu/infra/typeorm/entities/PiuLikes';
import PiuFavorite from '../../../../Piu/infra/typeorm/entities/PiuFavorite';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  photo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Piu, (piu) => piu.user)
  pius: Piu[];

  @OneToMany(() => PiuLike, (piuLike) => piuLike.user)
  likes?: PiuLike[];

  @OneToMany(() => PiuFavorite, (piuFavorite) => piuFavorite.user)
  favorites?: PiuFavorite[];

  @ManyToMany(() => User)
  @JoinTable()
  following: User[];

  followers:User[]
}

export default User;
