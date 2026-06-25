import {createNoteService , saveNoteService , getNotesService}from "./reading.service.js"

async function getNotesController(req , res){

    const userID = req.user.userID
    const bookID = req.params.bookID

    const data = {
        userID:userID,
        bookID:bookID
    }
    try{
        const result = await getNotesService(data)
        console.log("This are notes after service:" , result)
        return res.status(200).json({
            notes: result
            
        })

    }
    catch(err){
        console.log(err)
        res.status(400).json({
            message:"Internal Server error"
        })
    }

}
const createNote = async (req ,res)=>{
    
    const userID = req.user.userID
    const bookID = req.params.bookID

    const data = {
        userID:userID,
        bookID:bookID
    }

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


export {createNote , saveNote , getNotesController}