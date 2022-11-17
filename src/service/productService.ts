import { AppDataSource } from "../database/dbConnection"
import { Brand } from "../database/entities/brand"
import { Products } from "../database/entities/product"

export class ProductService{
    async createProduct(name : string, price : number, brandName : string){
        try {
            const checkProduct = await this.checkIfProductExist(name)

            if(checkProduct.length){
                throw new Error('Product already exist!')
            }

            const brand = await this.getBrand(brandName)

            if(!brand.length){
                throw new Error('Incorect brand!')
            }

            const product = Products.create({
                name : name,
                price : price,
                brand : brand[0]
            })

            product.save()

            return product
        } catch (error) {
            throw new Error(error.message)
        }
    }

    private async checkIfProductExist(name : string){
        const productRepository = AppDataSource.getRepository(Products)

        const product = await productRepository.findBy({
            name : name
        })

        return product
    }

    private async getBrand(name : string){
        const brandRepository = AppDataSource.getRepository(Brand)

        const brand = await brandRepository.findBy({
            name : name
        })

        return brand
    }
}