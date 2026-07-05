import z from "zod"

const noteSchema = z.object({
    noteID:z.number().int(),
    title:z.string(),
    content:z.string()
})

export default noteSchema
