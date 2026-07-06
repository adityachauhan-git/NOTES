import apifetch from "../api/api.js";


async function registerService(data){
    
    const res = await fetch("http://localhost:8080/auth/register" , {
        method:'POST',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })

    return res.json();

}

export {registerService}