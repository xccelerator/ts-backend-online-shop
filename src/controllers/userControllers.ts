import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/userService";
import { sign } from 'jsonwebtoken'

export class UserController{
    constructor(private userService : UserService){}

    private createToken(username : string, role : string){
        return new Promise<string>((resolve, reject) =>{
            sign({username, role}, <any>process.env.JWT_SECRET_KEY,{
                expiresIn : '24h'
            }, (err, token) => {
                if(err){
                    reject(err)
                }
                resolve(<any>token)
            })
        })
    }

    async login(req: Request, res : Response, next : NextFunction) : Promise<void>{
        const { username , password } = req.body
        try {
            const user = await this.userService.loginUser(username, password);

            if(!user.length){
                return next(res.json({message : "Error"}))
            }

            const jwt = await this.createToken(username, user[0].role)

            return next(res.json({jwt}))
        } catch (error) {
            return next(res.json({message : error.message}))
        }  
    } 

    async register(req: Request,res : Response, next : NextFunction) : Promise<void>{
        const { username, password, role } = req.body

        try {
            console.log(username, password, role)
            const user = await this.userService.createUser(username, password, role)

            if(!user){
                return next(res.json({message : "Error"}))
            }

            const jwt = await this.createToken(username, role)

            return next(res.json({jwt}))
        } catch (error) {
            return next(res.json({message : error.message}))
        }
    }
}