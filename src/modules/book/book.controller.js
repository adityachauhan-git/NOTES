import { libraryService,addBookService, deleteBookService , getBookService } from "./book.services.js"

async function libraryController(req , res){
   
    const userID = req.user.userID
    try{
        const books = await libraryService(userID)

        console.log("library service successful!")
        console.log("Sending books : " , books)
    
        return res.status(200).json({
            message:"Your books found!",
            books:books
        })
    }
    catch(err){

        console.log("LIbrary Service Failed!")
        console.log("Error: " , err)
        return res.status(500).json({
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

    
    
    try{
        const book = await addBookService(data)
        console.log("addBookService successfull!")
        console.log("Added Book: " , book)

        res.status(201).json({
            message:"Book added!",
            book: book
        })
    }
    catch(err){
        console.log("addBookController has some problem!")
        console.log(err)
        res.status(500).json({
            message:"Book not added! Internal Server error"
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

    console.log("deleteBookService successfull!")
    console.log("Is deleted: ",  isDeleted)

    if(isDeleted){

        console.log("Your Book was deleted!")
        return res.status(200).json(
           { message:"book deleted"}
        )
    }

    console.log("Book not deleted! but service ran without errors")

    return res.status(400).json({
        message:"Not deleted"
    })
    
    
}
catch(err){

    console.log("Something went wrong with deleteBookService!")
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
    try{
        const bookData = await getBookService(data)
        console.log("getBookService Successfull")
        console.log("bookData: ", bookData)
        return res.status(200).json({
            data:bookData
        })
    }
    catch(err){
        console.log("getBookService failed!")
        console.log(err)

        return res.status(500).json({
            message:"Internal server error"
        })

    }
}

export {libraryController , addBooksController , deleteBookController , getBookController}