import mongoose, { model, models, Schema } from "mongoose";

const PostSchema = new Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    likesCount: {type:Number, default:0},
    commentsCount: {type:Number, default:0},
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
},{
timestamps: true,
});

const Post = models?.Post || model('Post', PostSchema);

export default Post;

// const PostSchema = new Schema({
//     author: { type: mongoose.Types.ObjectId, ref: 'User' },
//     text: String,
//     likesCount: {type:Number, default:0},
//     parent: { type: mongoose.Types.ObjectId, ref: 'Post'},
// },{
// timestamps: true,
// });