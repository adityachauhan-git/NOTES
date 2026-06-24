const list = document.getElementById("book-list")

const bookNameInput = document.getElementById("book-name-input")
const addBookBtn = document.getElementById("book-detail-submit-btn")

async function createBookList(books){
    books.forEach((book)=>{
        const bookElement = document.createElement("li")
        const bookDelete = document.createElement("button")

        const bookID = book.id

        

        bookDelete.textContent = "Remove"
        bookElement.textContent = book.book_name


        bookDelete.addEventListener("click" , async()=>{
           const res = await fetch(`http://localhost:8080/books/deleteBook/${bookID}`,{
            method:"DELETE",
            credentials:"include"
            })
            list.removeChild(bookElement)
        })
    

        list.appendChild(bookElement)
        bookElement.appendChild(bookDelete)

    })
}

async function getBooks(){

    const res = await fetch("http://localhost:8080/books/library" , {
        method:"GET",
        credentials:"include"
    })

    const data = await res.json();

    const books = data.books

    createBookList(books)



    return data
}

window.addEventListener("DOMContentLoaded" , async()=>{
   const res = await getBooks()
})

addBookBtn.addEventListener("click" , async()=>{
    const bookDetail ={ bookName:bookNameInput.value }
    const res = await fetch("http://localhost:8080/books/addbooks" , {
        method: "POST",
        credentials:"include",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(bookDetail)
    })

    const data = await res.json()

    const book = [data.book]
    console.log(book)
    if(res.ok){
      createBookList(book)
    }
    
})

