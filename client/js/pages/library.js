import apifetch from "../api/api.js"
import { addBookService, bookDeleteService , getBooksService } from "../service/library.service.js"

const list = document.getElementById("book-list")

const bookNameInput = document.getElementById("book-name-input")
const addBookBtn = document.getElementById("book-detail-submit-btn")

window.addEventListener("DOMContentLoaded" , init)
addBookBtn.addEventListener("click" , handleAddBook)

async function init(){
    const books = await handleGetBooks()
    handleCreateBookList(books)
}

function handleCreateBookList(books){
    books.forEach((book)=>{
        const bookElement = document.createElement("li")
        const bookLink = document.createElement("a")
        const bookDelete = document.createElement("button")


        const bookID = book.id


        bookDelete.textContent = "Delete"
        bookLink.textContent = book.book_name
        bookLink.href = `http://127.0.0.1:5500/client/notes.html?bookID=${bookID}`


        bookDelete.addEventListener("click" ,()=> 
            {
                handleBookDelete(bookID , bookElement)
            }
        )
    

        list.appendChild(bookElement)
        bookElement.appendChild(bookLink)
        bookElement.appendChild(bookDelete)
        

    })
}

async function handleBookDelete(bookID , bookElement){
    await bookDeleteService(bookID)
    list.removeChild(bookElement)
}

async function handleGetBooks(){

    const data = await getBooksService()

    const books = data.books

    return books

}

async function handleAddBook(){
    const bookDetail ={ bookName:bookNameInput.value }
    const data = await addBookService(bookDetail)
    const book = [data.book]
    handleCreateBookList(book)  
}

