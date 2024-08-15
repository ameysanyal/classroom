import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Classroom from "../models/classroom.model.js";

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
        const { userType, name, email, password, newClassroom } = req.body;

        if (!name || !email || !userType) {
            return res.status(400).json({
                message: 'Send all the required fields except password',
            });
        }

        const { id } = req.params;

        // Find the classroom where the student is currently assigned
        const previousClassroom = await Classroom.findOne({ students: id });

        // Remove the student from the previous classroom if they are assigned to one
        if (previousClassroom) {
            previousClassroom.students.pull(id);
            await previousClassroom.save();
        }

        // If newClassroom is provided, add the student to the new classroom
        if (newClassroom) {
            const updateClass = await Classroom.findById(newClassroom);
            if (!updateClass) {
                return res.status(404).json({ message: "New classroom not found" });
            }

            updateClass.students.push(id);
            const classUpdated = await updateClass.save();

            if (!classUpdated) {
                return res.status(404).json({ message: "Class not Updated" });
            }

        }

        let updateData = {
            userType, name, email, newClassroom
        };

        // If password is provided, hash it before saving
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }

        // Update the user with the new data
        const user = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};


// export const editUser = async (req, res) => {
//     try {
//         const { userType, name, email, password, newClassroom } = req.body;
//         if (!name || !email || !password || !userType) {
//             return res.status(400).json({
//                 message: 'Send all the required fields',
//             });
//         }

//         const { id } = req.params;

//         // Find the classroom where the student is in the students array
//         const previousClassroom = await Classroom.findOne({ students: id });

//         const index = previousClassroom.students.indexOf(id)

//         const x = previousClassroom.students.splice(index, 1)

//         await previousClassroom.save();

//         const updateClass = await Classroom.findById(newClassroom)

//         updateClass.students.push(id)

//         await updateClass.save()

//         let updateData = {
//             userType, name, email, newClassroom
//         }

//         if (password) {
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password, salt);
//             updateData.password = hashedPassword;
//         }

//         const user = await User.findByIdAndUpdate(id, updateData, { new: true });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         return res.status(200).json({ message: 'User updated successfully', user });
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json({ message: error.message });
//     }
// };

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

