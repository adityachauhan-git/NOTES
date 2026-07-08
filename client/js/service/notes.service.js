import apifetch from "../api/api.js";

async function getNotesService(bookID){
    const res = await apifetch(`http://localhost:8080/notes/getNotes/${bookID}` , {
        method:"GET",
        credentials:"include"
    })

    return res;
}

async function getNoteService(note) {
    const res = await apifetch(`http://localhost:8080/notes/getNote/${note.id}` , {
        method:"GET",
        credentials:"include"
    })

    return res;
}

async function getBookDataService(bookID){
    const res = apifetch(`http://localhost:8080/books/book/${bookID}`)

    return res
}



export {getNotesService , getNoteService , getBookDataService}