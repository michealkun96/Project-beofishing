import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";

import { Product } from "./product.model";

@Entity("product_variants")
export class ProductVariant {
  // ===============================
  // Primary key
  // ===============================
  @PrimaryGeneratedColumn()
  id!: number;

  // ===============================
  // Variant info
  // ===============================
  @Column()
  name!: string; // VD: Size M, Size L, Red, Blue...

  @Column("decimal", { precision: 12, scale: 2 })
  price!: number;

  @Column({
    type: "int",
    default: 0,
  })
  stock!: number;

  @Column({
    type: "bit",
    default: true,
  })
  is_active!: boolean;

  // ===============================
  // Relation
  // ===============================
  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  // ===============================
  // Timestamps
  // ===============================
  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;
}
