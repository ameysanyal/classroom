const express = require('express');
const Classroom = require('../models/Classroom');
const User = require('../models/User');
const auth = require('../middlewares/auth');
const router = express.Router();

// Create a Classroom
router.post('/classroom', auth, async (req, res) => {
    const { name, schedule } = req.body;

    if (req.user.role !== 'Principal') {
        return res.status(403).json({ message: 'Authorization denied' });
    }

    try {
        const classroom = new Classroom({ name, schedule });
        await classroom.save();
        res.json(classroom);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Assign Teacher to Classroom
router.put('/classroom/:classroomId/assign-teacher', auth, async (req, res) => {
    const { teacherId } = req.body;
    if (req.user.role !== 'Principal') {
        return res.status(403).json({ message: 'Authorization denied' });
    }

    try {
        const classroom = await Classroom.findById(req.params.classroomId);
        const teacher = await User.findById(teacherId);

        if (!classroom || !teacher) {
            return res.status(404).json({ message: 'Classroom or Teacher not found' });
        }

        teacher.assignedClassroom = classroom.id;
        classroom.teacher = teacher.id;

        await teacher.save();
        await classroom.save();
        res.json(classroom);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Assign Students to Teacher
router.put('/classroom/:classroomId/assign-students', auth, async (req, res) => {
    const { studentIds } = req.body;

    if (req.user.role !== 'Principal') {
        return res.status(403).json({ message: 'Authorization denied' });
    }

    try {
        const classroom = await Classroom.findById(req.params.classroomId);
        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        const students = await User.find({ _id: { $in: studentIds }, role: 'Student' });
        students.forEach(student => {
            student.assignedClassroom = classroom.id;
        });

        classroom.students.push(...students.map(student => student.id));

        await Promise.all(students.map(student => student.save()));
        await classroom.save();
        res.json(classroom);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;


// Creating Classrooms and Assigning Teachers/Students