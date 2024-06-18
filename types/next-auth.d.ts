import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface Token {
    token: Token & DefaultSession["token"];
  }

  interface token {
    image: string | null;
  }
  interface User {
    role: string | null;
  }
}
