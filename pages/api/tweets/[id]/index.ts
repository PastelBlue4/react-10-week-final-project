import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../../libs/server/withHandler";
import withApiSession from "../../../../libs/server/withSession";
import client from "../../../../libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  const tweet = await client.tweet.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avator: true,
        },
      },
    },
  });
  const liked = await client.like.findFirst({
    where: {
      tweetId: tweet?.id,
      userId: user?.id,
    },
    select: {
      id: true,
    },
  });
  res.json({
    ok: true,
    tweet,
    liked,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
