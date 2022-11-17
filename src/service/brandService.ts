import { AppDataSource } from "../database/dbConnection"
import { Brand } from "../database/entities/brand"

export class BrandService {
    async createBrand(name : string){
        try {
            const checkBrand = await this.checkIfBrandExist(name)

            if(checkBrand.length){
                throw new Error('Brand already exist!')
            }

            const brand = Brand.create({
                name : name
            })

            await brand.save()

            return brand
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateBrand(name : string, newName : string){
        try {
            const brandRepository = AppDataSource.getRepository(Brand)

            const brand = await brandRepository.update({
                name : name
            },{
                name : newName
            })

            return brand
        } catch (error) {
            throw new Error(error.message)
        }
    }

    private async checkIfBrandExist(name : string){
        const brandRepository = AppDataSource.getRepository(Brand)

        const brand = await brandRepository.findBy({
            name : name
        })

        return brand
    }
}