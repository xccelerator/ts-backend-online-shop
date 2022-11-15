import { NextFunction, Request, Response } from "express";
import { RoutesController } from "./routesController";

export class BrandController extends RoutesController{
    constructor(){
        super();
        this.bindRoutes([
            {path : '/add', method: 'post', func : this.add},
            {path : '/delete', method: 'post', func : this.delete},
            {path : '/update', method: 'post', func: this.update},
        ])
    }

    add(req: Request,res : Response, next : NextFunction){
        res.send('add')
    }

    delete(req: Request,res : Response, next : NextFunction){
        res.send('delete')
    }

    update(req: Request,res : Response, next : NextFunction){
        res.send('update')
    }

}