import { registerService } from "./auth.services";


async function registerController(req , res){
    const data = req.body;

    const id = await registerService(data)

   return res.json({
        message:"User created",
        id: id
    })
}

async function loginController(req , res){
    const data = req.body
    const {ACCESS_TOKEN , REFRESH_TOKEN} = await loginService(data)

    if(ACCESS_TOKEN&&REFREASH_TOKEN){
    return res.json({
        message:"You are logged in"
    })
}
    return res.json({
        message:"Login failed!"
    })
}

export {registerController}