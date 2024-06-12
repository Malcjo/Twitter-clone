import {Schema, model, models} from "mongoose";

const UserSchema = new Schema({
    name: String,
    email: String,
    imagemage: String,
    cover: String,
    bio: String,
    username: String,
});

const User = models?.User || model('User', UserSchema);

export default User;