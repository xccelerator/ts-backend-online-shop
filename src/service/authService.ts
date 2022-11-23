import { compareSync, hash } from "bcrypt"
import { sign } from "jsonwebtoken"
import { AppDataSource } from "../database/dbConnectios"
import { User } from "../database/entities/user"

function createToken(username : string, role : string){
    return new Promise<string>((resolve, reject) => {
        sign({ username, role }, process.env.JWT_SECRET_KEY, {
            expiresIn : '24h'
        }, (err, token) => {
            if(err){
                reject(err)
            }
            resolve(token)
        })
    })
}

async function checkUser(username : string) {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findBy({
        username : username
    })

    return user
}

async function createUser(username : string, password : string, role : string){
    try {
        const user = await checkUser(username)

        if(user.length){
            throw new Error("Username already exist!")
        }

        const hashPassword = await hash(password, 7)

        const newUser = User.create({
            username : username,
            password : hashPassword,
            role : role
        })

        await newUser.save()

        return newUser
    } catch (error) {
        throw new Error(error.message)
    }
}

async function loginUser(username : string, password : string){
    try {
        const user = await checkUser(username)

        if(!user.length){
            throw new Error('Invalid account!')
        }

        let comparePassword = compareSync(password, user[0].password)

        if(!comparePassword){
            throw new Error('Incorect password!')
        }

        return user[0]
    } catch (error) {
        throw new Error(error.message) 
    }
}

export {
    createUser,
    createToken,
    loginUser,
}