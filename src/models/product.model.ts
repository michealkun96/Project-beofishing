import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";

import { Category } from "./category.model";
import { ProductVariant } from "./product-variant.model";
import { ProductImage } from "./product-image.model";

@Entity("products")
export class Product {
  // ===============================
  // Primary key
  // ===============================
  @PrimaryGeneratedColumn()
  id!: number;

  // ===============================
  // Basic info
  // ===============================
  @Column()
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column("text", { nullable: true })
  short_description!: string;

  @Column("longtext", { nullable: true })
  description!: string;

  @Column("decimal", { precision: 12, scale: 2 })
  base_price!: number;

  @Column({
    type: "enum",
    enum: ["normal", "new", "hot", "sale"],
    default: "normal",
  })
  status!: "normal" | "new" | "hot" | "sale";

  // ===============================
  // Relations
  // ===============================

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "category_id" })
  category!: Category | null;

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants!: ProductVariant[];

  @OneToMany(() => ProductImage, (image) => image.product)
  images!: ProductImage[];

  // ===============================
  // Timestamps
  // ===============================

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;
}
