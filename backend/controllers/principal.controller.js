import User from "../models/user.model.js";

export const createUser = async (req, res) => {
    try {
        const { userType, name, email, password } = req.body;
        if (!name || !email || !password || !userType) {
            return res.status(400).json({
                message: 'Send all the required fields',
            });
        }

        const newUser = { userType, name, email, password };
        const user = await User.create(newUser);
        return res.status(201).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
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
        const user = await User.findById(id);
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
        const { userType, name, email, password } = req.body;
        if (!name || !email || !password || !userType) {
            return res.status(400).json({
                message: 'Send all the required fields',
            });
        }

        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.log(error.message);
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
