import {Router} from "express"

import { libraryController , addBooksController, deleteBookController, getBookController } from "./book.controller.js"

import {authMiddleware} from "../../common/middleware/auth.middleware.js"
import { validate } from "../../common/middleware/validate.js"

import bookSchema from "./book.schema.js"

const router = Router()

router.get("/library" ,authMiddleware, libraryController)
router.get("/book/:id" , authMiddleware , getBookController)
router.post("/addbooks" , authMiddleware ,validate(bookSchema), addBooksController)
router.delete("/deleteBook/:id",authMiddleware, deleteBookController)

export default router
