import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export class AuthMiddleware{
    roles : string[]

    constructor(roles  : string[]){
        this.roles = roles
    }

    execute(req : Request, res : Response, next : NextFunction){
        const token = this.checkToken(req.headers.authorization)

        if(typeof token == 'string'){
            try {
                const decodedToken = verify(token, process.env.JWT_SECRET_KEY)

                if(!this.roles.includes((<any>decodedToken).role)){
                    return next(res.json({message : "You dont have permission!"}))
                }

                (<any>req).user = decodedToken

                    next()
            } catch (error) {
                return next(res.json({message : "Wrong Token!"}))
            }
        } else {
            return next(res.json({message : "Not Authorized!"}))
        }
    }

   private checkToken(bearerToken : string) : string | boolean{
        if(bearerToken){
            const token = bearerToken.split(' ')[1]
            if(!token){
                return false
            }

            return token
        }
        return false
   } 
}  