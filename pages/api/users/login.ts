import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withApiSession from "../../../libs/server/withSession";
import withHandler from "../../../libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  const userData = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (!userData) return res.status(404).end();
  req.session.user = {
    id: userData.id,
  };
  await req.session.save();
  return res.json({
    ok: true,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
