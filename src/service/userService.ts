import { User } from "../database/entities/user";
import { hash, compareSync } from 'bcrypt'
import { AppDataSource } from "../database/dbConnection";

export class UserService {
    async createUser(username : string, password : string, role : string){
        try {
            const checkUser = await this.checkIfUserExist(username)

            if(checkUser.length){
                throw new Error('Username already exist!')
            }
 
            const hashPassword = await hash(password,7)

            const user =  User.create({
                username : username,
                password : hashPassword,
                role : role
            })

            await user.save()
            
            return user;
        } catch (error) {
            throw new Error("Error")
        }
    }

    async loginUser(username : string, password : string){
        const user = await this.checkIfUserExist(username)

        if(!user.length){
            throw new Error('Invalid account!')
        }

        try {
            console.log(user, user[0].password)
            let comparePassword = compareSync(password, user[0].password)

            if(!comparePassword){
                throw new Error('Incorect password!')
            }

            return user;
        } catch (error) {
            throw new Error('Error')
        }
    }

    private async checkIfUserExist(username : string){

        
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.findBy({
            username : username
        })

        return users
    }
}