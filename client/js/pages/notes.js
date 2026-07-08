import apifetch from "../api/api.js"

import { getNotesService } from "../service/notes.service.js"

const nav = document.getElementsByTagName("nav")

const libraryBtn = document.getElementById("library")

const toggleLeft = document.getElementById("toggle-left")
const toggleRight = document.getElementById("info-btn")
const sidebar = document.getElementById("left-sidebar")
const detailsPannel = document.getElementById("right-sidebar")
const bookDetails = document.getElementById("book-details")
const titleDetails = document.getElementById("title-details")
const dateDetails = document.getElementById("date-details")

const createNotebtn = document.getElementById("create-note")
const noContent = document.getElementById("no-content")
const noteForm = document.getElementById("note-form")

const notesList = document.querySelector(".notes-list")

const noteTitle = document.getElementById("note-title")
const noteContent = document.getElementById("note-content")

let timer
let currentNoteId = null


window.addEventListener("DOMContentLoaded" , ()=>{
    createNoteList()
})

toggleLeft.addEventListener("click" ,()=>{
    sidebar.classList.toggle("hide-panel")
})

toggleRight.addEventListener("click" , ()=>{
    detailsPannel.classList.toggle("hide-panel")
})

libraryBtn.addEventListener("click" ,()=>{
    window.location.href='library.html'
})

createNotebtn.addEventListener("click" , ()=>{
    openNoteEditor("" , "")

    //TODO- Reading mode function
    detailsPannel.classList.add("hide-panel")
    sidebar.classList.add("hide-panel")
    createNoteId()
    document.documentElement.requestFullscreen()
    createNoteList()


})

function openNoteEditor(title , content){

    noContent.classList.add("hidden");
    noteForm.classList.remove("hidden");
    

    noteTitle.value = title
    noteContent.value = content
}
   
async function getNotes(){
    const params = new URLSearchParams(window.location.search)
    
    const bookID = params.get("bookID")

    const result = await getNotesService(bookID)
    
    return result
}

async function createNoteList(){

    notesList.replaceChildren()

    const notes = await getNotes()
    console.log(notes)
    const notesArr = notes.notes

    notesArr.forEach((note)=>{
        const list = document.createElement("li")

        list.addEventListener("click" , async()=>{
            const res = await apifetch(`http://localhost:8080/notes/getNote/${note.id}` , {
                method:"GET",
                credentials:"include"
            })

            console.log(res)

            const params= new URLSearchParams(window.location.search)
            const bookID = params.get('bookID')

            const bookData = await apifetch(`http://localhost:8080/books/book/${bookID}`)
            console.log(bookData)
            noteDetail(res , bookData)

            const result = await res

            const title = result.data.title
            const content = result.data.content
            openNoteEditor(title , content)
            autoSaveNote(note.id)
            
            
        })
        
        if(note.title===""){
            list.textContent = `empty note`
            list.classList.add("empty-note")
            notesList.appendChild(list)
            autoSaveNote(note.id)
        
       
        return
        }

        else{
            list.textContent = note.title
            notesList.appendChild(list)
        }
    })
}

async function createNoteId(){

    const params = new URLSearchParams(window.location.search)
    const bookID =  params.get("bookID")

    const res = await apifetch(`http://localhost:8080/notes/createNote/${bookID}` , {
        method:"POST",
        
        credentials:"include",

    })

    const note = await res;
    console.log(note)
    currentNoteId = note.data.id;
    console.log(currentNoteId)
}

async function autoSaveNote(noteID){

noteTitle.addEventListener("input" , () =>{

    const data = {

        noteID:noteID,
        title:noteTitle.value,
        content:noteContent.value

    }
    
    autoSave(data)
    
})

noteContent.addEventListener("input" , ()=>{
    const data = {
        noteID:noteID,
        title:noteTitle.value,
        content:noteContent.value
    }

    autoSave(data)

})
}

async function autoSave(data){
    clearTimeout(timer);
    
    timer = setTimeout(async() =>{
        
        const res = await apifetch("http://localhost:8080/notes/saveNote" , {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(data)
        })
        createNoteList()
    },1000);
}

async function noteDetail(data , book){

   

    const createdAtDate = data.data.created_at.split('T')[0]

    bookDetails.textContent = `For Book:${book.data.book_name}`
    titleDetails.textContent = `title: ${data.data.title}`
    dateDetails.textContent = `Created on:${createdAtDate}`
}



