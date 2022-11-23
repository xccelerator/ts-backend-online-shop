import { Router } from "express";
import { addBrand, deleteBrand, update } from "../controllers/brandController";
import { checkRole } from "../middleware/authMiddleware";

const brandRoutes = Router()

brandRoutes.post('/add', checkRole(['USER', 'ADMIN']), addBrand)
brandRoutes.post('/delete', checkRole(['USER', 'ADMIN']),deleteBrand)
brandRoutes.post('/update', checkRole(['USER', 'ADMIN']),update)

export {
    brandRoutes
}