import z from "zod"

const book = z.object(
    {
        bookName: z.string().min(1)
    }
);

export default book;