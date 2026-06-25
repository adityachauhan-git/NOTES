import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

import {authMiddleware} from "../../common/middleware/auth.middleware.js"

import { createNote , getNotesController, saveNote } from "./reading.controllers.js";

const router = Router();


router.get("/getNotes/:bookID" , authMiddleware , getNotesController)
router.post("/createNote/:bookID" ,authMiddleware, createNote)

router.put("/saveNote" , saveNote)

export default router;