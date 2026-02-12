import type { LoginSchema } from "../zod/LoginSchema";
import type { RegisterSchema } from "../zod/RegisterSchema";
import z from "zod";

export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;
