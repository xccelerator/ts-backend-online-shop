import { NextFunction, Request, Response } from "express";
import { RoutesController } from "../controllers/routesController";
import { Products } from "../database/entities/product";
import { ProductService } from "../service/productService";

export class ProductRoutes extends RoutesController{
    constructor(
        private productService : ProductService
    ){
        super();
        this.bindRoutes([
            {
                path : '/add', 
                method: 'post', 
                func : this.add
            },
            {
                path : '/delete', 
                method: 'post', 
                func : this.delete
            },
            {
                path : '/update', 
                method: 'post', 
                func: this.update
            },
        ])
    }

    async add(req: Request,res : Response, next : NextFunction){
        const { name, price, brand } = req.body

        try {
            const addProduct = await this.productService.createProduct(name, price, brand)

            if(addProduct){
                return next(res.json({ message : "New Product was added!" }))
            }

            return next(res.json({ message : "Error" }))
        } catch (error) {
            return next(res.json({ message : error.message }))
        }
    }

    async delete(req: Request,res : Response, next : NextFunction){
        const { name } = req.body

        try {
            const delProd = await Products.delete({
                name : name
            })

            if(delProd.affected){
                return next(res.json({ message : "Product was deleted!" }))
            }

            return next(res.json({ message : "Error" }))
        } catch (error) {
            return next(res.json({ message : error.message }))
        }
    }

    async update(req: Request,res : Response, next : NextFunction){
        const { name , newName, newPrice, newBrand } = req.body

        try {
            const product = await this.productService.updateProduct(name, newName, newPrice, newBrand)

            if(product.affected){
                return next(res.json({ message : "Product was updated!" }))
            }

            return next(res.json({ message : "Error" }))
        } catch (error) {
            return next(res.json({ message : error.message}))
        }
    }

}