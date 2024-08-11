import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const router = express.Router();

// Principal account creation (One time setup)

router.post("/create-principal", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        user = new User({ name: "Principal", email, password, role: "Principal" });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: 360000 });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: 360000 });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
