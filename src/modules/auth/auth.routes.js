import { Router} from "express";

import { loginController, registerController , refreshTokenController} from "./auth.controller.js";

const router = Router()

router.post("/register" , registerController)
router.post("/login" , loginController)
router.post("/refreshToken" , refreshTokenController)

export default router
