import { Router } from "express";
import {signUp, signIn} from "../controllers/authController.js"
import {validateSchema} from "../middlewares/validateSchema.js"
import userSchema from "../schemas/userSchema.js"

const authRouter = Router()

authRouter.post("/sign-up", validateSchema(userSchema), signUp)
authRouter.post("/sign-in", signIn)

export default authRouter;