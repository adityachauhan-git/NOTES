import z from "zod"

const noteSchema = z.object({
    title:z.string(),
    content:z.string()
})

export default noteSchema