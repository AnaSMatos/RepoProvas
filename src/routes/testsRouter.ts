import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import {validateToken} from "../middlewares/validateToken.js"
import testSchema from "../schemas/testSchema.js"
import {getTests, postTest} from "../controllers/testsController.js"

const testsRouter = Router()

testsRouter.post("/tests",validateToken, validateSchema(testSchema), postTest)
testsRouter.get("/tests", validateToken, getTests)

export default testsRouter;