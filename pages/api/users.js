import { initMongoose } from "@/lib/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import {unstable_getServerSession} from "next-auth";

export default async function handle(req, res){

    await initMongoose();
    // const session = await unstable_getServerSession(req, res, authOptions);

    // if(!session){
    //     console.log('failed');
    //     res.status(401).json("you must be logged in.");
    //     return;
    // }
    // if(req.method === 'PUT'){
    //     const {username} = req.body;
    //     console.log('username');
    //     console.log({username});
    //     console.log('user id');
    //     console.log(session);
    //     await User.findByIdAndUpdate(session.user.id, {username});
    //     res.json('ok');
    // }
    if(req.method==='GET'){

    }
    const id = req.query.id;
    const user = await User.findById(id);
    res.json(user);
}