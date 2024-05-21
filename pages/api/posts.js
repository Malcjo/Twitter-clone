import { initMongoose } from "@/lib/mongoose";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res){
    await initMongoose(); // make sure you have a connnection to the database
    const session = await getServerSession(req, res, authOptions);

    if(req.method === 'GET'){
        res.json(await Post.find().sort({createdAt: -1}).exec());
    }

    if(req.method === 'POST'){
        const{text} = req.body;
        const post = await Post.create({
            author:session.user._id,
            text,
        });
        res.json(post);
    }
}