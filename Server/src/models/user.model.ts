import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        fullname: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        }
    },
    { timestamps: true }
)

const User = mongoose.model("User", userSchema)
export default User