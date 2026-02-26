import type { LoginSchema } from "../zod/LoginSchema";
import type { RegisterSchema } from "../zod/RegisterSchema";
import z from "zod";

export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;

export type User = {
    id: number;
    email: string | null;
    username: string;
    bio: string | null;
    firstName: string | null;
    lastName: string | null;
    birthday: Date | null;
    propic: string;
};

export type ServerResponse<T> = {
    success: boolean;
    data: T | null;
    message: string;
};

export type FriendRequest = {
    id: number;
    receiverId: number;
    createdAt: Date;
    senderId: number;
    status: string;
    updatedAt: Date;
    Sender: {
        id: number;
        propic: string;
        username: string;
    };
};
