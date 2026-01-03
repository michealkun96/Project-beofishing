import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "nvarchar", length: 150, nullable: true })
  full_name!: string | null;

  @Column({ type: "nvarchar", length: 150, nullable: true })
  email!: string | null;

  @Column({ type: "nvarchar", length: 20, nullable: true })
  phone!: string | null;

  @Column({ type: "nvarchar", length: 50, nullable: false })
  password!: string;

  @Column({ type: "nvarchar", length: 20, nullable: false })
  role!: string;

  @Column({ type: "bit", nullable: false, default: true })
  is_active!: boolean;

  @CreateDateColumn({
    type: "datetime",
    nullable: false,
    default: () => "GETDATE()",
  })
  created_at!: Date;
}
