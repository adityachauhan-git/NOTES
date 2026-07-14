import apifetch from "../api/api.js";

async function loginService(data){

    const res = await apifetch("http://localhost:8080/auth/login",{
        method:'post',
        headers:{
            "content-type":"application/json"
        },
        credentials:"include",
        
        body:JSON.stringify(data)
        
    }
    )

}


export default loginService