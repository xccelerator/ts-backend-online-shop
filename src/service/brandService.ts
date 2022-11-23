import { AppDataSource } from "../database/dbConnectios";
import { Brand } from "../database/entities/brand";

async function checkBrand(name : string){
    const brandRepository = AppDataSource.getRepository(Brand)

    const brand = await brandRepository.findBy({
        name : name
    })

    return brand
}

async function createBrand(name : string){
    try {
        const brand = await checkBrand(name)

       

        if(brand.length){
            console.log(brand)
            throw new Error('Brand already exist!')
        }

        const newBrand = Brand.create({
            name : name
        })

        await newBrand.save()

        return brand 
    } catch (error) {
        throw new Error(error.message)
    }
}

async function updateBrand(name : string, newName : string){
    try {
        const brand = await checkBrand(name)

        if(!brand.length){
            throw new Error('Brand does not exist!')
        }

        const brandRepository = AppDataSource.getRepository(Brand)

        const updBrand = await brandRepository.update({
            name : name
        },{
            name : newName
        })

        return updBrand
    } catch (error) {
        throw new Error(error.message)
    }
}

export {
    createBrand,
    updateBrand,
}