import apifetch from "../api/api.js"

import { getBookDataService, getNoteService, getNotesService } from "../service/notes.service.js"

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
const pageNumberModal = document.querySelector(".page-number-modal-parent")
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

    readingMode()

    createNoteId()
    createNoteList()


})



function readingMode(){
    detailsPannel.classList.add("hide-panel")
    sidebar.classList.add("hide-panel")
    document.documentElement.requestFullscreen()
}

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
    
    const notesArr = notes.notes

    notesArr.forEach((note)=>{
        const list = document.createElement("li")

        list.addEventListener("click" , async()=>{
            const res = await getNoteService(note)

            
            
            const result = await res
            
            const title = result.data.title
            const content = result.data.content

            const params= new URLSearchParams(window.location.search)
            const bookID = params.get('bookID')

            const bookData = await getBookDataService(bookID)
            
            noteDetail(res , bookData)
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

    pageNumberModal.classList.remove("hidden")

    const res = await apifetch(`http://localhost:8080/notes/createNote/${bookID}` , {
        
        method:"POST",
        credentials:"include"

    })

    currentNoteId = res.data.id;
    
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





