import { Router} from "express";

import { loginController, registerController } from "./auth.controller";

const route = Router()

route.post("/register" , registerController)
route.post("/login" , loginController)