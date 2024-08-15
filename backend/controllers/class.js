import Classroom from "../models/classroomModel.js";
import User from "../models/userModel.js";

// Create a new classroom
export const createClassroom = async (req, res) => {
    try {
        const { name, teacher, students, schedule } = req.body;

        const classroom = new Classroom({ name, teacher, students, schedule });
        await classroom.save();

        res.status(201).json(classroom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get classroom details
export const getClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id)
            .populate("teacher")
            .populate("students");
        if (!classroom) {
            return res.status(404).json({ message: "Classroom not found" });
        }
        res.status(200).json(classroom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update classroom details
export const updateClassroom = async (req, res) => {
    try {
        const updatedClassroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClassroom) {
            return res.status(404).json({ message: "Classroom not found" });
        }
        res.status(200).json(updatedClassroom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a classroom
export const deleteClassroom = async (req, res) => {
    try {
        const deletedClassroom = await Classroom.findByIdAndDelete(req.params.id);
        if (!deletedClassroom) {
            return res.status(404).json({ message: "Classroom not found" });
        }
        res.status(200).json({ message: "Classroom deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a student to a classroom
export const addStudentToClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id);
        const student = await User.findById(req.body.studentId);

        if (!classroom || !student) {
            return res.status(404).json({ message: "Classroom or student not found" });
        }

        classroom.students.push(student._id);
        await classroom.save();

        student.classroom = classroom._id;
        await student.save();

        res.status(200).json(classroom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

