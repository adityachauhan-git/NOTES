import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

import {authMiddleware} from "../../common/middleware/auth.middleware.js"
import { validate } from "../../common/middleware/validate.js";

import { createNote , getNoteController, getNotesController, saveNoteControllers , createSectionController} from "./reading.controllers.js";
import noteSchema from "./reading.schema.js";

const router = Router();


router.get("/getNotes/:bookID" , authMiddleware , getNotesController)
router.get("/getNote/:noteID", authMiddleware , getNoteController) 
router.post("/createNote/:bookID" ,authMiddleware, createNote)
router.put("/saveNote" ,authMiddleware, validate(noteSchema) ,saveNoteControllers)
router.post("/section" , authMiddleware , createSectionController)

export default router;