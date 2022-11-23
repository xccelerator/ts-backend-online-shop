import { AppDataSource } from "../database/dbConnectios"
import { Brand } from "../database/entities/brand"
import { Products } from "../database/entities/product"

async function checkBrand(name : string){
    const repository = AppDataSource.getRepository(Brand)

    const brand = await repository.findBy({
        name : name
    })

    return brand
}

async function checkProduct(name : string){
    const repository = AppDataSource.getRepository(Products)

    const product = await repository.findBy({
        name : name
    })

    return product
}

async function createProduct(name : string, price : number, brandName : string){
    try {
        const product = await checkProduct(name)

        if(product.length){
            throw new Error('Product already exist!')
        }

        const brand = await checkBrand(brandName)
        
        if(!brand.length){
            throw new Error('Incorect brand!')
        }
        
        const newProduct = Products.create({
            name : name,
            price : price,
            brand : brand[0]
        })

        newProduct.save()

        return newProduct
    } catch (error) {
        throw new Error(error.message)
    }
}

async function updateProduct(name : string, newName : string, newPrice : number, newBrand : string){
    try {
        const product = await checkProduct(name)

        if(!product.length){
            throw new Error('Incorect product')
        }

        const brand = await checkBrand(newBrand)

        if(!brand.length){
            throw new Error('Incorect brand')
        }

        const productRepository = AppDataSource.getRepository(Products)

        const updProduct = await productRepository.update({
            name : name
        }, {
            name : newName,
            price : newPrice,
            brand : brand[0]
        })

        return updProduct
    } catch (error) {
        throw new Error(error.message)
    }
}

export {
    createProduct,
    updateProduct,
}