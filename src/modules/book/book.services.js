import { pool } from "../../common/config/db.js"

async function libraryService(userID){

    const books = await pool.query("SELECT * FROM books WHERE user_id = ($1) " , [userID])
    
    return books.rows
 
}

async function addBookService(data){
  
    const {userID , bookName} = data

    console.log(userID)

    const book = await pool.query("INSERT INTO books(user_id , book_name) VALUES($1 ,$2) RETURNING id ,book_name" , [userID , bookName])

    const bookname = book.rows[0]

    return bookname
}

export {libraryService , addBookService}