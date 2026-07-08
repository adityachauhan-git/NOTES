import apifetch from "../api/api.js";

async function getNotesService(bookID){
    const res = await apifetch(`http://localhost:8080/notes/getNotes/${bookID}` , {
        method:"GET",
        credentials:"include"
    })

    return res;
}

export {getNotesService}