
import express from 'express'
import auth from '../middlewares/auth.js'
import { editClassroom, createClassroom, deleteClassroom, getClassrooms, getClassroom, updateClassroomStudents, deleteAllClassrooms } from '../controllers/classroom.controller.js';
const router = express.Router();


// Create a Classroom
router.post('/', auth, createClassroom);

router.get('/', auth, getClassrooms);

router.get('/:id', auth, getClassroom);

router.patch('/:id', auth, updateClassroomStudents);

router.put('/:id', auth, editClassroom)

router.delete('/:id', auth, deleteClassroom)

router.delete('/', auth, deleteAllClassrooms)

export default router;

