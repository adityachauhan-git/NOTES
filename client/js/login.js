const usernameInput = document.querySelector(".username")
const passwordInput = document.querySelector(".password")

const loginBtn = document.getElementById("login-btn")


loginBtn.addEventListener("click" , async ()=>{
    const username = usernameInput.value
    const password = passwordInput.value

    const data = {
        userName:username,
        pass:password
    }

    const res = await fetch("http://localhost:8080/auth/login",{
        method:'post',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    }
    )

    console.log(res)

})

