import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";

import { Product } from "./product.model";

@Entity("product_images")
export class ProductImage {
  // ===============================
  // Primary key
  // ===============================
  @PrimaryGeneratedColumn()
  id!: number;

  // ===============================
  // Image info
  // ===============================
  @Column()
  image_url!: string;

  @Column({
    type: "bit",
    default: false,
  })
  is_primary!: boolean;

  @Column({
    type: "int",
    default: 0,
  })
  sort_order!: number;

  // ===============================
  // Relation
  // ===============================
  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  // ===============================
  // Timestamps
  // ===============================
  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;
}
