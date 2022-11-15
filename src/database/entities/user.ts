import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity('user')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column({
        unique : true,
    })
    username : string;

    @Column()
    password : string;

    @Column({
        default : "USER",
    })
    role : string;
}