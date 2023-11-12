import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../../libs/server/withHandler";
import client from "../../../../libs/server/client";
import withApiSession from "../../../../libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  const LoginState = await client.like.findFirst({
    where: {
      tweetId: Number(id),
      userId: user?.id,
    },
  });
  if (LoginState) {
    await client.like.delete({
      where: {
        id: LoginState.id,
      },
    });
  } else {
    await client.like.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
