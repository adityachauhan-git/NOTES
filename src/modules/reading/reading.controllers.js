import {createNoteService , saveNoteService}from "./reading.service.js"

const createNote = async (req ,res)=>{
    
    const data = req.body;

    const result = await createNoteService(data)

    console.log("This is the first row of the returning value : " , result)
    
    res.status(201).json(
        {
            message:"Notes Created",
            data:result
        }
    )
}

const saveNote = async(req , res)=>{
    const data = req.body

    const result = saveNoteService(data)

    res.json({
        message:"Successfully saved"
    })
}


export {createNote , saveNote}