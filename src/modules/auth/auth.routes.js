import { Router} from "express";

import { loginController, registerController , refreshTokenController} from "./auth.controller.js";

import { validate } from "../../common/middleware/validate.js";

import userSchema from "./auth.schema.js";


const router = Router()

router.post("/register" ,validate(userSchema), registerController)
router.post("/login" ,validate(userSchema), loginController)
router.get("/refreshToken" , refreshTokenController)

export default router
