import withApiSession from "../../../libs/server/withSession";
import client from "../../../libs/server/client";
import withHandler from "../../../libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userData = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  res.json({
    ok: true,
    userData,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
