import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
    {
        userType: {
            type: String,
            enum: ["Principal", "Teacher", "Student"],
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
    } catch (error) {
        next(error);
    }
});

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
            },
            process.env.JWT_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.log(error);
    }
};

const User = mongoose.model("User", userSchema);

export default User;

// User Model (Principal, Teacher, Student):
