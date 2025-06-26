import NextAuth from "next-auth"

declare module "next-auth" {
    interface User { 
        id?: string;
        firstName?: string;
        lastName?: string;
        username: string;
        email: string;
        password?: string;
    }
    interface Session {
        id?: string
        username: string
        email: string
        password?: string
    }
    interface Token {
        id?: string;
        username?: string;
        email?: string;
    }
}