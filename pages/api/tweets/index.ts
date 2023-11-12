import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";
import withApiSession from "../../../libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const getTweets = await client.tweet.findMany({
      include: {
        _count: {
          select: {
            Like: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            avator: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.json({
      ok: true,
      getTweets,
    });
  }
  if (req.method === "POST") {
    const {
      body: { contents },
      session: { user },
    } = req;
    const createTweet = await client.tweet.create({
      data: {
        contents,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      createTweet,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
