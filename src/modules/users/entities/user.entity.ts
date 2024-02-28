import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Status } from '../../statuses/entities/status.entity';
import { FileEntity } from '../../files/entities/file.entity';
import bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { AuthProvidersEnum } from '../../auth/auth-providers.enum';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column({ default: AuthProvidersEnum.email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Index()
  @Column({ type: String, nullable: true, name: 'social_id' })
  @Expose({ groups: ['me', 'admin'] })
  socialId: string | null;

  @Index()
  @Column({ type: String, nullable: true, name: 'first_name' })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true, name: 'last_name' })
  lastName: string | null;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn({ name: 'photo_id' })
  photo?: FileEntity | null;

  @ManyToOne(() => Role, {
    eager: true,
  })
  @JoinColumn({ name: 'role_id' })
  role?: Role | null;

  @ManyToOne(() => Status, {
    eager: true,
  })
  @JoinColumn({ name: 'status_id' })
  status?: Status;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
