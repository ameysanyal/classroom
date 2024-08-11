import mongoose from "mongoose";

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
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },

        assignedClassroom: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: "Classroom",
            type: String,
            default: 'none'
        },
    },
    {
        timestamps: true,
    }
);


const User = mongoose.model("User", userSchema);

export default User;

// User Model (Principal, Teacher, Student):
