import apifetch from "../api/api.js";

async function bookDeleteService(bookID){
    const res = await apifetch(`http://localhost:8080/books/deleteBook/${bookID}` , {
        method:"DELETE",
        credentials:"include"
    })
}

async function getBooksService(){
    const res = await apifetch("http://localhost:8080/books/library" , {
        method:"GET",
        credentials:"include"
    });

    return res
}

async function addBookService(bookDetail){

    const res = await apifetch("http://localhost:8080/books/addbooks" , {
        method: "POST",
        credentials:"include",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(bookDetail)
    })

    return res

}

export {bookDeleteService , getBooksService , addBookService}