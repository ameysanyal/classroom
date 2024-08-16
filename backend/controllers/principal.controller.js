import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Classroom from "../models/classroom.model.js";
import mongoose from "mongoose";

export const createUser = async (req, res) => {
    try {

        const { userType, name, email, password, classroom } = req.body;
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);
        if (!name || !email || !password || !userType) {
            return res.status(400).json({
                message: 'Send all the required fields',
            });
        }

        const newUser = { userType, name, email, password, classroom };
        const user = await User.create(newUser);
        return res.status(201).json({
            msg: "User Created Sucessfully", token: await user.generateToken(),
            userId: user._id.toString(),
        });
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0]; // Get the field that caused the duplicate error
            res.status(400).json({
                message: `Duplicate key error: The value for '${field}' already exists.`,
                field: field, // The field that caused the issue
                error: error.message, // The full error message
            });
        } else {
            // Handle other errors
            res.status(500).json({ message: error.message });
        }
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).populate("classroom").exec();
        return res.status(200).json({
            count: users.length,
            data: users,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const getUserdetails = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate("classroom").exec();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const editUser = async (req, res) => {
    try {
        const { userType, name, email, password, classroom } = req.body;



        const { id } = req.params;


        const previousClassroom = await Classroom.findOne({ students: id });
        const previousTeacherClassroom = await Classroom.findOne({ teacher: id });

        if (previousClassroom) {
            previousClassroom.students.pull(id);
            await previousClassroom.save();
        }


        if (previousTeacherClassroom) {
            previousTeacherClassroom.teacher = null
            await previousTeacherClassroom.save();
        }


        if (classroom && userType === "Student") {
            const updateClass = await Classroom.findById(classroom);
            if (!updateClass) {
                return res.status(404).json({ message: "New classroom not found" });
            }

            updateClass.students.push(id);
            const classUpdated = await updateClass.save();

            if (!classUpdated) {
                return res.status(404).json({ message: "Class not updated" });
            }
        }

        if (classroom && userType === "Teacher") {
            const updateClass = await Classroom.findById(classroom);
            if (!updateClass) {
                return res.status(404).json({ message: "New classroom not found" });
            }

            updateClass.teacher = id;
            const classUpdated = await updateClass.save();

            if (!classUpdated) {
                return res.status(404).json({ message: "Class not updated" });
            }
        }


        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        user.userType = userType;
        user.name = name;
        user.email = email;
        user.classroom = classroom;
        user.password = password


        const updatedUser = await user.save();

        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};



export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const addTeacherClassroom = async (req, res) => {

    console.log(`adding class`)
    try {
        const { id } = req.params
        const { classroomId } = req.body
        const result = await User.findById(id)
        if (!classroomId) {
            return res.status(400).json({ message: "classroomId is required" });
        }

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }

        result.classroom = classroomId
        await result.save();

        return res.status(200).json({ message: 'Succesfully Added Class TeacherClassroom' });

    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}
