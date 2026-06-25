    import { pool } from "../../common/config/db.js"

    async function getNotesService(data){

        const {userID , bookID} = data
        
        const result = await pool.query("SELECT id FROM notes WHERE user_id = $1 AND book_id = $2" , [userID , bookID])
        const notes = result.rows
        return notes
    }
    
    const createNoteService = async (data)=>{

        const {title , content} = data

        try{
        const result = await pool.query("INSERT INTO notes (title , content) VALUES ($1,$2) RETURNING *" , ["" , ""])
        console.log("This is the raw returning value :  " , result)
        return result.rows[0]
        }
        catch(err){
            console.log(err)
        }
        

    }

    const saveNoteService = ()=>{
        
    }



    export {createNoteService , saveNoteService , getNotesService}