    import { pool } from "../../common/config/db.js"

    async function getNotesService(data){

        const {userID , bookID} = data
        
    

        const result = await pool.query("SELECT * FROM notes WHERE user_id = $1 AND book_id = $2" , [userID , bookID])

        const notes = result.rows
        return notes
    }
    
    async function getNoteService(data){
        const {userID , noteID} = data
        console.log(noteID)
        const note_query = await pool.query("SELECT title FROM notes WHERE user_id = $1 AND id = $2" , [userID , noteID])
        const content_query = await pool.query("SELECT * from note_content where note_id = $1 order by pos" , [noteID])
        console.log("content: " , content_query.rows)
        const title = note_query.rows[0].title

        

        const content = content_query.rows[0].content

        const result = {
            title : title,
            content: content
        }

        return result
        

    }

    async function createNoteService(data){

        const {userID , bookID ,startingFrom , sectionPos} = data

       const emptyCheck = await pool.query("SELECT * FROM notes WHERE user_id = $1 AND book_id = $2 AND title = $3" , [userID , bookID , ""])

       if(emptyCheck.rowCount!==0){
        return emptyCheck.rows[0]
       }

        const content_query = await pool.query("INSERT INTO note_content (note_id , content , page_number) VALUES ($1 , $2,$3) RETURNING *" , [noteID , "" , startingFrom])
        
        const contentID = content_query.rows[0].id 

        const note_query = await pool.query("INSERT INTO notes (user_id , book_id , title, head ) VALUES ($1,$2,$3,$4) RETURNING *" , [userID , bookID,"" , contentID])

        const noteID = note_query.rows[0].id

       console.log(content_query)


        const res = {
            noteID  : noteID,
            
            from: content_query.rows[0].page_number
        }

        return res
        
    }

    async function saveNoteService(data){
        const {noteID , title , content} = data

        const note_query = await pool.query("UPDATE notes SET title = $1 WHERE id = $2" , [title , noteID])
        const content_query = await pool.query("UPDATE note_content SET content=$1 WHERE note_id = $2" , [content , noteID])

    }



    export {createNoteService , saveNoteService , getNotesService , getNoteService}