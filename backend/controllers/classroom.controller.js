import Classroom from '../models/classroom.model.js'

export const createClassroom = async (req, res) => {

    try {
        const { name, teacher, schedule } = req.body;
        if (!name || !teacher || !schedule) {
            return res.status(400).json({
                message: 'Send all the required fields',
            });
        }

        const newClassroom = { name, teacher, schedule };
        const classroom = await Classroom.create(newClassroom);
        return res.status(201).json(classroom);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}

export const getClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find({});
        return res.status(200).json({
            count: classrooms.length,
            data: classrooms,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}

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