import { NextFunction, Request, Response } from "express";
import { createToken, createUser, loginUser } from "../service/authService";

async function login(req : Request, res : Response, next : NextFunction) : Promise<void>{
    const { username, password } = req.body

    try {
        const user = await loginUser(username, password)

        if(!user){
            res.json({ message : "Unexpected error!" })
        }

        const jwt = await createToken(username, user.role)

        res.send({ jwt})
    } catch (error) {
        res.json({ message : error.message })
    }
}

async function register(req : Request, res : Response, next : NextFunction) : Promise<void>{
    const { username, password, role } = req.body

    try {
        const user = await createUser(username, password, role)

        if(!user){
            res.json({ message : "Unexpected error!"})
        }

        const jwt = await createToken(username, role)

        res.json({ jwt })
    } catch (error) {
        res.json({ message : error.message })
    }
}

export {
    login,
    register,
}