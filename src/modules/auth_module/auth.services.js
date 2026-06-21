import bcrypt from "bcrypt"
import { pool } from "../../common/db"

const saltRounds = 10

async function hashPassword(data){
    hashedData = await bcrypt.hash(data , saltRounds)

    return hashedData

}

async function registerService(data){
    
    const {userName , pass} = data
    
    const hashedPass = await hashedPassword(pass);

    const user = await pool.query("INSERT INTO users(username , hashed_password) VALUES ($1 , $2) RETURNING *", [userName , hashedPass])

    const userID = user.rows[0].id
     
    return userID 
}

export {registerService}