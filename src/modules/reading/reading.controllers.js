import {createNoteService , saveNoteService , getNotesService , getNoteService}from "./reading.service.js"

async function getNotesController(req , res){

    const userID = req.user.userID
    const bookID = req.params.bookID

    const data = {
        userID:userID,
        bookID:bookID
    }
    try{
        const result = await getNotesService(data)
        console.log("getNotesService successfull!")
        console.log("sending notes: " , result)
        return res.status(200).json({
            notes: result
            
        })

    }
    catch(err){
        console.log("getNotesService Failed!")
        console.log("Error: " , err)
        res.status(400).json({
            message:"Internal Server error"
        })
    }

}

async function getNoteController(req , res){

    const userID = req.user.userID
    const noteID = req.params.noteID

    const data = {
        userID:userID,
        noteID:noteID
    }

    try{
        const result = await getNoteService(data)

        console.log("getNoteService(single note) successfull")
        console.log("sending note: " , result)

        return res.status(200).json({
            message:"Note Found",
            data: result
        })
    }
    catch(err){
        
        console.log("getNoteService failed!")
        console.log("Error: " , err)

        return res.status(400).json({
            message:"Note not found"
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

    try{
        const result = await createNoteService(data)

        console.log("createNoteService  is successfull")
        console.log("The data sent is: " , result)
    
        res.status(201).json(
            {
                message:"Notes Created",
                data:result
            }
        )
    }


    catch(err){
        console.log("createNoteService failed!")
        console.log("Error: " , err)

        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

const saveNoteControllers = async(req , res)=>{
    const data = req.body

    try{
        const result = saveNoteService(data)
        
        console.log("saveNoteService successfull!")

        res.status(200).json({
            message:"Successfully saved"
        })
    }
    catch(err){

        console.log("saveNoteService Failed")
        console.log("Error: " , err)

        res.status(500).json({
            message:"Autosave unsuccessfull"
        })
    }
}




export {createNote , saveNoteControllers , getNotesController , getNoteController}