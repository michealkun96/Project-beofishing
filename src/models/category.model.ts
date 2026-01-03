import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { Product } from "./product.model"; // 🔴 BẮT BUỘC

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "nvarchar", length: 150 })
  name!: string;

  @Column({ type: "nvarchar", length: 160 })
  slug!: string;

  @Column({ type: "int", nullable: true })
  parent_id!: number | null;

  @Column({ type: "nvarchar", nullable: true })
  description!: string | null;

  @Column({ type: "bit", default: true })
  is_active!: boolean;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  // ===============================
  // Self relation
  // ===============================

  @ManyToOne(() => Category, (category) => category.children, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "parent_id" })
  parent!: Category | null;

  @OneToMany(() => Category, (category) => category.parent)
  children!: Category[];

  // ===============================
  // Product relation (FIX LỖI Ở ĐÂY)
  // ===============================

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
