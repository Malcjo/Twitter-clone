import {initMongoose} from "../../lib/mongoose";
import {authOptions} from "./auth/[...nextauth]";
import {unstable_getServerSession} from "next-auth";
import { getServerSession } from "next-auth";
import Like from "../../models/Like";
import Post from "../../models/Post";

export default async function handle(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);

  const postId = req.body.id;
  const userId = session.user.id;

  const existingLike = await Like.findOne({author:userId,post:postId});

    //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    //console.log(existingLike);

  if (existingLike) {
    await existingLike.deleteOne();
    res.json(null);
  } else {
    const like = await Like.create({author:userId,post:postId});
    res.json({like});
  }
}