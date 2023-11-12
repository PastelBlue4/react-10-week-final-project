import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "user",
  password: "4SAApfqlSqhEhjzQ8JaVBZrwdhyjt6Qt7x5wEr",
};

export default function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
