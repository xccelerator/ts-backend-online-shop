import { NextFunction, Request, Response } from "express";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { RoutesController } from "../controllers/routesController";

export class BrandController extends RoutesController{
    constructor(){
        super();
        this.bindRoutes([
            {   path : '/add', 
                method: 'post', 
                func : this.add, 
                middlewares : [new AuthMiddleware(['admin'])]
            },
            {   path : '/delete',
                method: 'post', 
                func : this.delete,
                middlewares : [new AuthMiddleware(['admin'])]
            },
            {   path : '/update', 
                method: 'post', 
                func: this.update,
                middlewares : [new AuthMiddleware(['admin'])]
            },
        ])
    }

    add(req: Request,res : Response, next : NextFunction){
        
    }

    delete(req: Request,res : Response, next : NextFunction){
        res.send('delete')
    }

    update(req: Request,res : Response, next : NextFunction){
        res.send('update')
    }

}