import { initMongoose } from "@/lib/mongoose";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Like from "../../models/Like";

export default async function handler(req, res){
    await initMongoose(); // make sure you have a connnection to the database
    const session = await getServerSession(req, res, authOptions);

    if(req.method === 'GET'){
        const {id} = req.query;
        //if have ID
        if(id)
            {
            const post = await Post.findById(id)
            .populate('author')
            .populate({
                path: 'parent',
                puoplate: 'author',
            });
            res.json({post});
        }
        //if don't have ID
        else 
        {
            const parent = req.query.parent || null;
            
            const author = req.query.author;
            const searthFilter = author ? {author} : {parent};

            const posts = await Post.find(searthFilter)
            .populate('author')
            .sort({createdAt: -1})
            .limit(20)
            .exec();
            let postsLikedByMe =[];
            if(session){
                postsLikedByMe = await Like.find({
                    author:session.user.id,
                    post:posts.map(p => p._id),
                });
            }


            const idsLikedByMe = postsLikedByMe.map(like => like.post);
            
            res.json({
                posts,
                idsLikedByMe,
            });
        }

    }

    if(req.method === 'POST'){
        const{text, parent} = req.body;
        const post = await Post.create({
            author:session.user.id,
            text,
            parent,
        });
        if(parent){
            const parentPost = await Post.findById(parent);
            parentPost.commentsCount = await Post.countDocuments({parent});
            await parentPost.save();
        }


        res.json(post);
    }

    // async function updateCommentsCount(postId){
    //     const post = await Post.findById(postId);
    //     console.log("Like amount: " + await Like.countDocuments({post:postId}));
    //     post.likesCount = await Like.countDocuments({post:postId});
    //     await post.save();
    //   }
}

