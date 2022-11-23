import { Router } from "express";
import { login, register } from "../controllers/authControllers";

const authRoutes = Router()

authRoutes.post('/login', login)
authRoutes.post('/register', register)

export { authRoutes } 