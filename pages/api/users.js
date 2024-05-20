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

    // if(!session){
    //     console.log('failed');
    //     res.status(401).json("you must be logged in.");
    //     return;
    // }
    if(req.method === 'PUT'){
        const {username} = req.body;
        //console.log('username');
        //console.log({username});
        //console.log('user id');
        //console.log(session);
        await User.findByIdAndUpdate(session.user.id, {username});
        res.json('update');
        console.log(session.username);
    }
    if(req.method==='GET'){
        const id = req.query.id;
        const user = await User.findById(id);
        console.log('session');
        console.log(session);
        res.json(user);
    }

}