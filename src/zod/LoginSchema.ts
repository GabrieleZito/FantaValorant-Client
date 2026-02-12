import z from "zod";

export const LoginSchema = z.object({
    email: z.email("Not a valid email format"),
    password: z.string().min(1, "Password is required"),
});
