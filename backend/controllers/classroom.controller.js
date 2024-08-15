import Classroom from '../models/classroom.model.js'

export const createClassroom = async (req, res) => {
    try {
        const { name, teacher, students, schedule } = req.body;
        if (!name || !schedule) {
            return res.status(400).json({
                message: 'Send all the required fields',
            });
        }

        const classroom = new Classroom({ name, teacher, students, schedule });
        await classroom.save();

        res.status(201).json(classroom);
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
}

export const getClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find({}).populate("teacher").populate("students");;
        return res.status(200).json({
            count: classrooms.length,
            data: classrooms,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}

// Get classroom details
export const getClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id).populate("students");
        if (!classroom) {
            return res.status(404).json({ message: "Classroom not found" });
        }
        res.status(200).json(classroom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteClassroom = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Classroom.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "classroom not found" });
        }
        return res.status(200).json({ message: 'classroom deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}

export const updateClassroomStudents = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId } = req.body
        const result = await Classroom.findById(id)
        result.students.push(studentId);
        await result.save();

        return res.status(200).json({ message: 'Students Array updated succesfully', result });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }

}


export const deleteAllClassrooms = async (req, res) => {
    try {

        const result = await Classroom.deleteMany({})
        if (!result) {
            return res.status(400).json({ message: "Classroom not Found" })
        }
        return res.status(200).send({ message: "All classrooms Deleted successfully" })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
}