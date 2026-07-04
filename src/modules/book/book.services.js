import { pool } from "../../common/config/db.js"

async function libraryService(userID){

    const books = await pool.query("SELECT * FROM books WHERE user_id = ($1) " , [userID])
    
    return books.rows
 
}

async function addBookService(data){
  
    const {userID , bookName} = data

    const book = await pool.query("INSERT INTO books(user_id , book_name) VALUES($1 ,$2) RETURNING id ,book_name" , [userID , bookName])

    const bookname = book.rows[0]

    return bookname
}

async function deleteBookService(data){
    const {userID , bookID} = data

       const result =  await pool.query("DELETE FROM books WHERE user_id = $1 AND id = $2", [userID , bookID])
       
       if(result.rowCount===0){
        return false
       }
       return true
    
}

async function getBookService(data){
   const userID = data.userID
   const bookID = Number(data.bookID.id)

   const res = await pool.query("SELECT * FROM books WHERE user_id = $1 AND id = $2" , [userID , bookID])
    
   return res.rows[0]
}   


export {libraryService , addBookService, deleteBookService , getBookService}