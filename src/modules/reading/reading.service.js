    import { pool } from "../../common/config/db.js"

    async function getNotesService(data){

        const {userID , bookID} = data
        
        const result = await pool.query("SELECT * FROM notes WHERE user_id = $1 AND book_id = $2" , [userID , bookID])
        console.log(result)
        const notes = result.rows
        return notes
    }
    
    const createNoteService = async (data)=>{

        const {userID , bookID} = data

       
        const result = await pool.query("INSERT INTO notes (user_id , book_id , title , content) VALUES ($1,$2,$3,$4) RETURNING *" , [userID , bookID,"" , ""])
        console.log("This is the raw returning value :  " , result)
        return result.rows[0]
        
        

    }

    const saveNoteService = ()=>{
        
    }



    export {createNoteService , saveNoteService , getNotesService}