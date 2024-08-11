import Classroom from "../models/classroom.model";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

// Create a new teacher
exports.createUser = async (req, res) => {
    const { userType, name, email, password } = req.body;

    if (req.user.role !== "Principal") {
        return res.status(403).json({ message: "Authorization denied" });
    }

    try {
        let user = await User.findOne({ email });
        if (user)
            return res.status(400).json({ message: "Teacher already exists" });

        user = new User({
            name,
            email,
            password,
            role: "Teacher",
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Create a new student
exports.createStudent = async (req, res) => {
    const { name, email, password } = req.body;

    if (req.user.role !== "Principal" && req.user.role !== "Teacher") {
        return res.status(403).json({ message: "Authorization denied" });
    }

    try {
        let user = await User.findOne({ email });
        if (user)
            return res.status(400).json({ message: "Student already exists" });

        user = new User({
            name,
            email,
            password,
            role: "Student",
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Create a classroom
exports.createClassroom = async (req, res) => {
    const { name, schedule } = req.body;

    if (req.user.role !== "Principal") {
        return res.status(403).json({ message: "Authorization denied" });
    }

    try {
        const classroom = new Classroom({
            name,
            schedule,
        });

        await classroom.save();
        res.json(classroom);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Assign a teacher to a classroom
exports.assignTeacherToClassroom = async (req, res) => {
    const { teacherId } = req.body;

    if (req.user.role !== "Principal") {
        return res.status(403).json({ message: "Authorization denied" });
    }

    try {
        const classroom = await Classroom.findById(req.params.classroomId);
        const teacher = await User.findById(teacherId);

        if (!classroom || !teacher) {
            return res
                .status(404)
                .json({ message: "Classroom or Teacher not found" });
        }

        teacher.assignedClassroom = classroom.id;
        classroom.teacher = teacher.id;

        await teacher.save();
        await classroom.save();
        res.json(classroom);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Assign students to a classroom
exports.assignStudentsToClassroom = async (req, res) => {
    const { studentIds } = req.body;

    if (req.user.role !== "Principal") {
        return res.status(403).json({ message: "Authorization denied" });
    }

    try {
        const classroom = await Classroom.findById(req.params.classroomId);
        if (!classroom) {
            return res.status(404).json({ message: "Classroom not found" });
        }

        const students = await User.find({
            _id: { $in: studentIds },
            role: "Student",
        });

        students.forEach((student) => {
            student.assignedClassroom = classroom.id;
        });

        classroom.students.push(...students.map((student) => student.id));

        await Promise.all(students.map((student) => student.save()));
        await classroom.save();
        res.json(classroom);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get list of teachers
exports.getTeachers = async (req, res) => {
    if (req.user.role !== "Principal") {
        return res.status(403).json({ message: "Authorization denied" });
    }

    try {
        const teachers = await User.find({ role: "Teacher" });
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get list of students
exports.getStudents = async (req, res) => {
    if (req.user.role !== "Principal") {
        return res.status(403).json({ message: "Authorization denied" });
    }

    try {
        const students = await User.find({ role: "Student" });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update teacher or student details
exports.updateUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (req.user.role !== "Principal") {
        return res.status(403).json({ message: "Authorization denied" });
    }

    try {
        let user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a teacher or student
exports.deleteUser = async (req, res) => {
    if (req.user.role !== "Principal") {
        return res.status(403).json({ message: "Authorization denied" });
    }

    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.remove();
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
