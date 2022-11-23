import { Router } from "express";
import { addProduct, deleteProduct, update } from "../controllers/productController";
import { checkRole } from "../middleware/authMiddleware";

const productRoutes = Router()

productRoutes.post('/add', checkRole(['USER', 'ADMIN']),addProduct)
productRoutes.post('/delete', checkRole(['USER', 'ADMIN']),deleteProduct)
productRoutes.post('/update',checkRole(['USER', 'ADMIN']),update)

export{
    productRoutes,
}