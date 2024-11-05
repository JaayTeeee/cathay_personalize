import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("user", userSchema);

export default User