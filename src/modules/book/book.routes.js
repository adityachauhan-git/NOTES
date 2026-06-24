import {Router} from "express"

import { libraryController , addBooksController, deleteBookController } from "./book.controller.js"
import {authMiddleware} from "../../common/middleware/auth.middleware.js"

const router = Router()

router.get("/library" ,authMiddleware, libraryController)
router.post("/addbooks" , authMiddleware , addBooksController)
router.delete("/deleteBook/:id",authMiddleware, deleteBookController)

export default router
