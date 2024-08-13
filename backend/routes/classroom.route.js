
import express from 'express'

import { createClassroom, deleteClassroom, getClassrooms } from '../controllers/classroom.controller.js';
const router = express.Router();


// Create a Classroom
router.post('/', createClassroom);

router.get('/', getClassrooms);

router.delete('/:id', deleteClassroom)

export default router;

