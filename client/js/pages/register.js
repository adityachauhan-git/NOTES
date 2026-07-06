import apifetch from "../api/api.js"
import { registerService } from "../service/register.service.js"

const usernameInput = document.querySelector(".username")
const passwordInput = document.querySelector(".password")

const registerBtn = document.querySelector(".register-btn")




registerBtn.addEventListener("click" , handleRegister)

async function handleRegister(){

    const username = usernameInput.value
    const password = passwordInput.value

    const data = {
        userName:username,
        pass:password
    }
    
    registerService(data)
}

