import { Router, NextFunction, Request, Response } from 'express'

interface MiddleWare{
    execute : (req : Request, res : Response, next : NextFunction) => void;
}

interface Route{
    path : string;
    func : (req : Request, res  : Response, next : NextFunction) => void
    method : keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
    middlewares? : MiddleWare[];
}

export abstract class RoutesController {
    private readonly _router : Router

    constructor() {
        this._router = Router()
    }

    get router(){
        return this._router
    }

    protected bindRoutes(routes : Route[]){
        for(const route of routes){
            const handler = route.func.bind(this)
            const middleware = route.middlewares?.map(m => m.execute.bind(m))
            const pipeline = middleware ? [...middleware, handler] : handler
            this.router[route.method](route.path, pipeline)
        }
    }
}