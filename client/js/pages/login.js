import { registerService } from "../service/register.service"

const usernameInput = document.querySelector(".username")
const passwordInput = document.querySelector(".password")

const loginBtn = document.getElementById("login-btn")

const loginErr = document.getElementById("credentials-error")


loginBtn.addEventListener("click" , handleLogin)

async function handleLogin(){
    const username = usernameInput.value
    const password = passwordInput.value

    const data = {
        userName:username,
        pass:password
    }

    const res = registerService(data)
    if(res.ok){
        window.location.href = 'library.html'
    }
    else{
        loginErr.classList.remove("hidden")
    }
}

