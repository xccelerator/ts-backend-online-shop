import { App } from "./app";
import { BrandController } from "./routes/brand";
import { ProductController } from "./routes/product";
import { UserController } from "./routes/users";
import { UserService } from "./service/userService";
import 'reflect-metadata'
import { AppDataSource } from "./database/dbConnection";

async function bootstrap() {
    const app = new App(new UserController(new UserService), 
                        new BrandController, 
                        new ProductController)
    try {
        AppDataSource.initialize().then(async () => {
            console.log("Database sucessfully connected!")
            await app.init()
        })
    } catch (error) {
        console.log("Error")
    }
    
}

bootstrap()