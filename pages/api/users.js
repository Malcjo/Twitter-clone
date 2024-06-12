import { initMongoose } from "@/lib/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { getSession } from "next-auth/react";

export default async function handle(req, res){

    //const session = await getSession({req});
    await initMongoose();
    const session = await getServerSession(req, res, authOptions);
    console.log('Server Session: ', session);

    if(!session){
        console.log('failed');
        res.status(401).json("you must be logged in.");
        return;
    }
    if(req.method === 'PUT'){
        const {username} = req.body;
        await User.findByIdAndUpdate(session.user.id, {username});
        res.json('update');
    }
    if(req.method==='GET'){
        const {id, username} = req.query;
        const user = id 
        ? await User.findById(id)
        : await User.findOne({username});
        res.json(user);
    }

}