import { Router } from "express";
import { authRoutes } from "./authRouter"
import { brandRoutes } from "./brandRouter";
import { productRoutes } from "./productRouter";

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/product', productRoutes)
routes.use('/brand', brandRoutes)

export { routes }