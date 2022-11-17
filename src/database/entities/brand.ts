import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Products } from "./product";

@Entity('brand')
export class Brand extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column({
        unique : true,
    })
    name : string;

    @OneToMany(
        () => Products,
        products => products.brand
    )
    products : Products[]
    
}