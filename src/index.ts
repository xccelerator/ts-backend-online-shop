import { App } from "./app";
import { BrandController } from "./routes/brand";
import { ProductController } from "./routes/product";
import { UserRoutes } from "./routes/users";
import { UserService } from "./service/userService";
import 'reflect-metadata'
import { AppDataSource } from "./database/dbConnection";
import { UserController } from "./controllers/userControllers";

async function bootstrap() {
    const app = new App(new UserRoutes(new UserController(new UserService)), 
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