import { NextFunction, Request, Response } from "express";
import { Products } from "../database/entities/product";
import { createProduct, updateProduct } from "../service/productService";

async function addProduct(req : Request, res : Response, next : NextFunction) : Promise<void>{
    const { name, price, brand } = req.body

    try {
        const product = await createProduct(name, price, brand)

        if(!product){
            return next (res.json({ message : "Unexpected error!" }))
        }

        res.json({ message : "New product was added!" })
    } catch (error) {
        res.json({ message : error.message })
    }
}

async function deleteProduct(req : Request, res : Response, next : NextFunction) : Promise<void>{
    const { name } = req.body

    try {
        const delProd = await Products.delete({
            name : name
        })

        if(!delProd.affected){
            return next(res.json({ message : "Product does not exist!" }))
        }

        res.json({ message : "Product was deleted!" })
    } catch (error) {
        res.json({ message : error.message })
    }
}

async function update(req : Request, res : Response, next : NextFunction) : Promise<void>{
    const { name, newName, newPrice, newBrand } = req.body

    try {
        const product = await updateProduct(name, newName, newPrice, newBrand)

        if(!product.affected){
            return next(res.json({ message : "Unexpected error!" }))
        }

        res.json({ message : "Product was updated!" })
    } catch (error) {
        res.json({ message : error.message })
    }
}

export {
    addProduct,
    deleteProduct,
    update,
}