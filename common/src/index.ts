import z from "zod"

export const signupIput = z.object({
    email : z.email(),
    password: z.string().min(6),
    name : z.string().optional()
})

export type SignupInput = z.infer<typeof signupIput>

export const signinInput = z.object({
    email : z.email(),
    password: z.string().min(6),
    name : z.string().optional()
})

export type SigninInput = z.infer<typeof signinInput>

export const createBlogInput = z.object({
    title : z.string(),
    content : z.string(),
})

export type CreateBlogInput = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    title : z.string(),
    content : z.string(),
    id: z.string()
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>
