import express, { Express } from 'express'
import { Server } from 'http'
import { BrandRoutes } from './routes/brand';
import { ProductRoutes } from './routes/product';
import { UserRoutes } from './routes/users';
import { json } from 'body-parser';
require('dotenv').config()

export class App{
    app : Express;
    server : Server;
    port : number;
    userRoutes : UserRoutes;
    brandRoutes : BrandRoutes;
    productRoutes : ProductRoutes;

    constructor(
        userRoutes : UserRoutes,
        brandRoutes : BrandRoutes,
        productRoutes : ProductRoutes,
    ) {
        this.app = express();
        this.port = Number(process.env.PORT) || 5050;
        this.userRoutes = userRoutes;
        this.brandRoutes = brandRoutes;
        this.productRoutes = productRoutes;
    }

    useRoutes(){
        this.app.use('/users',this.userRoutes.router )
        this.app.use('/brand',this.brandRoutes.router)
        this.app.use('/product',this.productRoutes.router)
    }

    public async init() {
        this.app.use(json());
        this.useRoutes();
        this.server = this.app.listen(this.port)
        console.log(`listening on http://localhost:${this.port}`)
    }
}