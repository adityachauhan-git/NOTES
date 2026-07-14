import loginService from "../service/login.service.js"


const usernameInput = document.querySelector(".username")
const passwordInput = document.querySelector(".password")

const loginBtn = document.getElementById("login-btn")

const loginErr = document.getElementById("credentials-error")


loginBtn.addEventListener("click" , handleLogin)

async function handleLogin(){

    console.log("Hello")

    const username = usernameInput.value
    const password = passwordInput.value

    const data = {
        userName:username,
        pass:password
    }
    try{
    const res = loginService(data)
    window.location.href = 'library.html'
}

catch(err){
    console.log(err)
}


}

