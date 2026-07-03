import z from "zod"

const userSchema = z.object(
    {
        userName: z.string().min(3),
        pass : z.string().min(8)
    }

)

export default userSchema