const express = require('express');
const User = require('../models/User');
const auth = require('../middlewares/auth');
const router = express.Router();

// Get the list of students in the same classroom as the logged-in student
router.get('/classmates', auth, async (req, res) => {
    if (req.user.role !== 'Student') {
        return res.status(403).json({ message: 'Authorization denied' });
    }

    try {
        const students = await User.find({ assignedClassroom: req.user.assignedClassroom, role: 'Student' });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
