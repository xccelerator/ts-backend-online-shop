import express, { Express } from 'express'
import { Server } from 'http'
import { BrandController } from './routes/brand';
import { ProductController } from './routes/product';
import { UserController } from './routes/users';
import { json } from 'body-parser';
require('dotenv').config()


export class App{
    app : Express;
    server : Server;
    port : number;
    userController : UserController;
    brandController : BrandController;
    productController : ProductController;

    constructor(
        userController : UserController,
        brandController : BrandController,
        productController : ProductController,
    ) {
        this.app = express();
        this.port = Number(process.env.PORT) || 5050;
        this.userController = userController;
        this.brandController = brandController;
        this.productController = productController;
    }

    useRoutes(){
        this.app.use('/users',this.userController.router )
        this.app.use('/brand',this.brandController.router)
        this.app.use('/product',this.productController.router)
    }

    public async init() {
        this.app.use(json());
        this.useRoutes();
        this.server = this.app.listen(this.port)
        console.log(`listening on http://localhost:${this.port}`)
    }
}