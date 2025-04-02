import z, { string } from 'zod'

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string()
})
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
export const userUpdateInput = z.object({
    name:z.string(),
    role:z.string().optional().default(''),
    bio:z.string().optional().default('')
})

export const blogCreateInput = z.object({
    title: z.string(),
    content: z.string(),
    description: z.string(),
    tags:z.array(string())
})
export const blogUpdateInput = z.object({
    title: z.string(),
    content:z.string(),
    description: z.string(),
    tags:z.array(string())
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type UserUpdateInput = z.infer<typeof userUpdateInput>
export type BlogCreateInput = z.infer<typeof blogCreateInput>
export type BlogUpdateInput = z.infer<typeof blogUpdateInput>