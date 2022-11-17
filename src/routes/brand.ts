import { NextFunction, Request, Response } from "express";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { RoutesController } from "../controllers/routesController";
import { Brand } from "../database/entities/brand";
import { BrandService } from "../service/brandService";

export class BrandRoutes extends RoutesController{
    constructor(
        private brandService : BrandService
    ){
        super();
        this.bindRoutes([
            {   path : '/add', 
                method: 'post', 
                func : this.add, 
                // middlewares : [new AuthMiddleware(['admin'])]
            },
            {   path : '/delete',
                method: 'post', 
                func : this.delete,
                // middlewares : [new AuthMiddleware(['admin'])]
            },
            {   path : '/update', 
                method: 'post', 
                func: this.update,
                // middlewares : [new AuthMiddleware(['admin'])]
            },
        ])
    }

    async add(req: Request,res : Response, next : NextFunction){
        const { name } = req.body

        try {
            const brand = await this.brandService.createBrand(name)

            console.log(brand)

            if(brand){
                return next(res.json({ message : "New brand was added!" }))
            }

            return next(res.json({ message : "Error" }))
        } catch (error) {
            return next(res.json({ message : error.message }))
        }
    }

    async delete(req: Request,res : Response, next : NextFunction){
        const { name } = req.body

        try {
            const delBrand = await Brand.delete({
                name : name
            })

            if(delBrand.affected){
                return next(res.json({ message : "Brand was deleted!" }))
            }

            return next(res.json({ message : "Error" }))
        } catch (error) {
            return next(res.json({ message : error.message }))
        }
    }

    async update(req: Request,res : Response, next : NextFunction){
        const { name, newName } = req.body

        try {
            const checkUpdate = await this.brandService.updateBrand(name, newName)

            if(checkUpdate.affected){
                return next(res.json({ message : "Brand was updated!" }))
            }

            return next(res.json({ message : "Error" }))
        } catch (error) {
            return next(res.json({ message : error.message }))
        }
    }

}