import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

import { createNote , saveNote } from "./reading.controllers.js";

const router = Router();

router.post("/createNote" , createNote)

router.put("/saveNote" , saveNote)

export default router;