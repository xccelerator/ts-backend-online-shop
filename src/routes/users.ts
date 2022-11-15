import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/userService";
import { RoutesController } from "./routesController";
import { sign } from 'jsonwebtoken'

export class UserController extends RoutesController{
    constructor(
        private userService : UserService,
    ){
        super();
        this.bindRoutes([
            { path : '/register', method: 'post', func : this.register },
            { path : '/login', method: 'post', func : this.login },
        ])
    }

    async login(req: Request, res : Response, next : NextFunction) : Promise<void>{
        const { username , password } = req.body
        try {
            const user = await this.userService.loginUser(username, password);

            if(!user.length){
                return next(res.json({message : "Error"}))
            }

            const jwt = await this.createToken(username, user[0].password)

            return next(res.json({jwt}))
        } catch (error) {
            return next(res.json({message : error.message}))
        }
        
        
    }

    async register(req: Request,res : Response, next : NextFunction) : Promise<void>{
        const { username, password, role } = req.body

        try {
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

    private createToken(username : string, role : string){
        return new Promise<string>((resolve, reject) =>{
            sign({username, role}, process.env.JWT_SECRET_KEY,{
                expiresIn : '24h'
            }, (err, token) => {
                if(err){
                    reject(err)
                }
                resolve(token)
            })
        })
    }
}