const express = require('express');
const User = require('../models/User');
const Classroom = require('../models/Classroom');
const auth = require('../middlewares/auth');
const router = express.Router();

// Get the list of students in the teacher's classroom
router.get('/students', auth, async (req, res) => {
    if (req.user.role !== 'Teacher') {
        return res.status(403).json({ message: 'Authorization denied' });
    }

    try {
        const teacher = await User.findById(req.user.id).populate('assignedClassroom');
        const students = await User.find({ assignedClassroom: teacher.assignedClassroom._id, role: 'Student' });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update student details by teacher
router.put('/student/:studentId', auth, async (req, res) => {
    const { name, email, password } = req.body;

    if (req.user.role !== 'Teacher') {
        return res.status(403).json({ message: 'Authorization denied' });
    }

    try {
        let student = await User.findOne({ _id: req.params.studentId, role: 'Student' });

        if (!student || student.assignedClassroom.toString() !== req.user.assignedClassroom.toString()) {
            return res.status(404).json({ message: 'Student not found or not in your class' });
        }

        student.name = name || student.name;
        student.email = email || student.email;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            student.password = await bcrypt.hash(password, salt);
        }

        await student.save();
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a student by teacher
router.delete('/student/:studentId', auth, async (req, res) => {
    if (req.user.role !== 'Teacher') {
        return res.status(403).json({ message: 'Authorization denied' });
    }

    try {
        const student = await User.findOne({ _id: req.params.studentId, role: 'Student', assignedClassroom: req.user.assignedClassroom });

        if (!student) {
            return res.status(404).json({ message: 'Student not found or not in your class' });
        }

        await student.remove();
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
