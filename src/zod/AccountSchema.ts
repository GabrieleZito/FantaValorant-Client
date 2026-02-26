import z from "zod";

export const AccountSchema = z.object({
    username: z.string().min(3, "Username is required"),
    email: z.string().email("Invalid email address"),
    firstName: z.string().nullable().optional(),
    lastName: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    birthday: z.string().nullable().optional(),
    propic: z.string().nullable().optional(),
});

export type AccountType = z.infer<typeof AccountSchema>;
