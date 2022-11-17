import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Brand } from "./brand";

@Entity('products')
export class Products extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column({
        unique : true,
    })
    name : string;

    @Column()
    price : number;

    @ManyToOne(
        () => Brand,
        brand => brand.products
    )

    @JoinColumn({
        name : 'brand_id'
    })
    brand : Brand
}