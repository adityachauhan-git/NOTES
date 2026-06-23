import {Router} from "express"

import { libraryController } from "./book.controller.js"
import {authMiddleware} from "../../common/middleware/auth.middleware.js"

const router = Router()

router.get("/library" ,authMiddleware, libraryController)

export default router