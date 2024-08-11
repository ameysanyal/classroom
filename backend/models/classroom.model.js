import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    schedule: [
        {
            day: { type: String, required: true },
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
        },
    ],
}, {
    timestamps: true
});


export default Classroom = mongoose.model("Classroom", classroomSchema);
