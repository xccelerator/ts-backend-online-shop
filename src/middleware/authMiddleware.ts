import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

function checkToken(bearerToken : string) : string | boolean{
    if(!bearerToken){
        return false
    }

    const token = bearerToken.split(' ')[1]

    if(!token){
        return false
    }

    return token
}

export function checkRole(role : string[]){
    return function(req : Request, res : Response, next : NextFunction){
        const token = checkToken(req.headers.authorization)

        if(!token){
            return next(res.json({ message : "Not Authorized!" }))
        }

        try {
            if(typeof token === 'string'){
                const decodedToken = verify(token, process.env.JWT_SECRET_KEY)

                if(!role.includes((<any>decodedToken).role)){
                    return next(res.json({ message : "You dont have permission!" }))
                }

                (<any>req).user = decodedToken
                
                next()
            }

            return next(res.json({message : "Unexpected Error!"}))
        } catch (error) {
            return next(res.json({ message : error.message }))
        }
    }
}