import { App } from "./app";
import { BrandRoutes } from "./routes/brand";
import { ProductController } from "./routes/product";
import { UserRoutes } from "./routes/users";
import { UserService } from "./service/userService";
import 'reflect-metadata'
import { AppDataSource } from "./database/dbConnection";
import { UserController } from "./controllers/userControllers";
import { BrandService } from "./service/brandService";
import { ProductService } from "./service/productService";

async function bootstrap() {
    const app = new App(new UserRoutes(new UserController(new UserService)), 
                        new BrandRoutes(new BrandService), 
                        new ProductController(new ProductService))
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