import { NextApiRequest, NextApiResponse } from "next";
import { CustomUser } from "@/lib/types";
import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === "POST") {
        // POST /api/billing/manage – manage a user's subscription
        const { id, name, email, image } = req.body
        const user = await prisma.user.create({
            data: {
                'id': id,
                'name': name,
                'email': email,
                'image': image
            }
        });
        
    
    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }

    return res.status(200).json(user);
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
