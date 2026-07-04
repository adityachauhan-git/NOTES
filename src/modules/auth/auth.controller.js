import { registerService , loginService , refreshTokenService} from "./auth.services.js";


async function registerController(req , res){
    const data = req.body;

    try{
    const id = await registerService(data)
    
    console.log("register service has no errors!")
    console.log("this is the data sending back to client: id: " , id)

   return res.json({
        message:"User created",
        id: id
    })
}

catch(err){
    console.log("something went wrong with the register service.")
    console.log("Data recieved by the controller: " , data)

    res.status(500).json({
        message:"Internal Server error"
    })
}

}

async function loginController(req , res){
    const data = req.body

   try{
    const {ACCESS_TOKEN , REFRESH_TOKEN} = await loginService(data)
    

    
    if(ACCESS_TOKEN!=null&&REFRESH_TOKEN!=null){

        console.log("Tokens recieved by the login controller from the login service")
        console.log("The tokens are:")
        console.log("Access Token: ", ACCESS_TOKEN)
        console.log("Refresh Token: ", REFRESH_TOKEN)
        res.cookie("ACCESS_TOKEN", ACCESS_TOKEN, {
            
            httpOnly: true,
            sameSite:"none",
            maxAge:60*60*1000,
            secure: true
      
        });

        res.cookie("REFRESH_TOKEN" , REFRESH_TOKEN, {
            httpOnly: true,
            sameSite:"none",
            maxAge:7*24*60*60*1000,
            secure: true
        
        });

        return res.json({
            message:"You are logged in"
        })
    }

    else{
        console.log("Tokens not recieved by the login controller from the login service!")
        return res.status(403).json({
            message:"Login failed!"
        })
    }}

    catch(err){
        console.log("Login service failed!" , err);

        return res.status(500).json({
            message: "Internal Server Error!"
        })

    }


    }
    
async function refreshTokenController(req , res){

    if(!req.cookies.REFRESH_TOKEN){

        console.log("There is no refresh token in the cookies sent to refreashToken Controller")

        return res.status(400).json(
            {
                message:"no refresh token"
            }
        )
    }

    try{
        const result = await refreshTokenService(req.cookies.REFRESH_TOKEN)

        console.log("refreshToken service successfully generated the access token.")
        console.log("New Access Token: " , result)

     res.cookie("ACCESS_TOKEN" , result , {
            httpOnly: true,
            sameSite:"none",
            maxAge:60*60*1000,
            secure: true
        })

        return res.status(200).json(
            {
                message:"access token regenerated!"
            }
        )
    }
    catch(err){
        
        console.log("refreshToken Service failed!")
        console.log("Error: " , err)

        return res.status(500).json(
            {
                message: "Internal server error"
            }
        )

    }

}

export {registerController , loginController , refreshTokenController}