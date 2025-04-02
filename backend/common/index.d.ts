import z from 'zod';
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const userUpdateInput: z.ZodObject<{
    name: z.ZodString;
    role: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    bio: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    role: string;
    bio: string;
}, {
    name: string;
    role?: string | undefined;
    bio?: string | undefined;
}>;
export declare const blogCreateInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    description: z.ZodString;
    tags: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    description: string;
    tags: string[];
}, {
    title: string;
    content: string;
    description: string;
    tags: string[];
}>;
export declare const blogUpdateInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    content?: string | undefined;
    description?: string | undefined;
    tags?: string[] | undefined;
}, {
    title?: string | undefined;
    content?: string | undefined;
    description?: string | undefined;
    tags?: string[] | undefined;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type UserUpdateInput = z.infer<typeof userUpdateInput>;
export type BlogCreateInput = z.infer<typeof blogCreateInput>;
export type BlogUpdateInput = z.infer<typeof blogUpdateInput>;
