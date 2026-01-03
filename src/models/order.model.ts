import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";

import { User } from "./user.model";

@Entity("orders")
export class Order {
  // ===============================
  // Primary key
  // ===============================
  @PrimaryGeneratedColumn()
  id!: number;

  // ===============================
  // Relations
  // ===============================
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: User;

  // ===============================
  // Order info
  // ===============================
  @Column("decimal", { precision: 12, scale: 2 })
  total_amount!: number;

  @Column({ type: "nvarchar", length: 20 })
  order_status!: string;

  @Column({ type: "nvarchar", length: 50, nullable: true })
  payment_method!: string | null;

  @Column({ type: "nvarchar", nullable: true })
  shipping_address!: string | null;

  // ===============================
  // Timestamps
  // ===============================
  @CreateDateColumn({
    type: "datetime",
    default: () => "GETDATE()",
  })
  created_at!: Date;
}
