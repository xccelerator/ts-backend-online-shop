import { NextFunction, Request, Response } from "express";
import { Brand } from "../database/entities/brand";
import { createBrand, updateBrand } from "../service/brandService";

async function addBrand(req : Request, res : Response, next : NextFunction) : Promise<void>{
    const { name } = req.body

    try {
        const brand = await createBrand(name)

        if(!brand){
            return next(res.json({ message : "Unexpected error!" }))
        }

        return next(res.json({ message : "New brand was added!" }))
    } catch (error) {
        return next(res.json({ message: error.message }))
    }
}

async function deleteBrand(req : Request, res : Response, next : NextFunction) : Promise<void>{
    const { name } = req.body

    try {
        const delBrand = await Brand.delete({
            name : name
        })

        if(!delBrand.affected){
            return next(res.json({ message : "Brand does not exist!" }))
        }

        res.json({ message : "Brand was deleted!" })
    } catch (error) {
        res.json({ message : error.message })
    }
}

async function update(req : Request, res : Response, next : NextFunction) : Promise<void>{
    const { name, newName } = req.body

    try {
        const checkUpdate = await updateBrand(name, newName)

        if(!checkUpdate.affected){
            return next(res.json({ message : "Unexpected error!" }))
        }

        res.json({ message : "Brand was updated" })
    } catch (error) {
        res.json({ message : error.message })
    }
}

export {
    addBrand,
    deleteBrand,
    update,
}