import type { LoginSchema } from "../zod/LoginSchema";
import type { RegisterSchema } from "../zod/RegisterSchema";
import z from "zod";

export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;

export type User = {
    id: number;
    email: string;
    username: string;
    bio: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    propic: string;
};
