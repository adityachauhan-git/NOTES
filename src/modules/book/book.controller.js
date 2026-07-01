import { libraryService,addBookService, deleteBookService , getBookService } from "./book.services.js"

async function libraryController(req , res){
   
    const userID = req.user.userID
    try{
    const books = await libraryService(userID)

    
    return res.status(200).json({
        message:"Your books found!",
        books:books
    })
}
catch(err){

    console.log(err)
    return res.status(404).json({
        message:"Internal server error"
    })
}
}

async function addBooksController(req , res){
    
    const userID = req.user.userID
    const bookName = req.body.bookName
    
    const data = {
        userID:userID,
        bookName:bookName
    }

    console.log(data.bookName)
    
    try{
        const book = await addBookService(data)
        console.log(book.book_name)

        res.status(201).json({
            message:"Book added!",
            book: book
        })
    }
    catch(err){

        console.log(err)
        res.status(400).json({
            message:"Book not added"
        })
    }
}

async function deleteBookController(req , res){
    const data = {
        userID: req.user.userID,
        bookID: req.params.id
    }
    try{
    const isDeleted = await deleteBookService(data) 
    if(isDeleted){
        return res.status(200).json(
           { message:"book deleted"}
        )
    }

    return res.status(400).json({
        message:"Not deleted"
    })
    
    
}
catch(err){

    console.log(err)

    return res.status(400).json({
        message:"Not deleted"
    })
}
    
}

async function getBookController(req , res){
     const data = {
        bookID:req.params,
        userID:req.user.userID
    }

    const bookData = await getBookService(data)

    return res.status(200).json({
        data:bookData
    })
}

export {libraryController , addBooksController , deleteBookController , getBookController}