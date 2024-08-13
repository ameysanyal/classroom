import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        ref: "User"
    },
    // students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    schedule: [
        {
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
            startDay: { type: String, required: true },
            endDay: { type: String, required: true },
        },
    ],
}, {
    timestamps: true
});

const Classroom = mongoose.model("Classroom", classroomSchema);

export default Classroom
