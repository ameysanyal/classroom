import express from 'express'
// import auth from '../middlewares/auth'
import { getUserdetails, getUsers, createUser, deleteUser, editUser } from '../controllers/principal.controller.js'
const router = express.Router();

// router.post('/', auth, principalController.createTeacher);
// router.post('/create-student', auth, principalController.createStudent);
// router.post('/classroom', auth, principalController.createClassroom);
// router.put('/classroom/:classroomId/assign-teacher', auth, principalController.assignTeacherToClassroom);
// router.put('/classroom/:classroomId/assign-students', auth, principalController.assignStudentsToClassroom);
// router.get('/teachers', auth, principalController.getTeachers);
// router.get('/students', auth, principalController.getStudents);
// router.put('/user/:userId', auth, principalController.updateUser);
// router.delete('/user/:userId', auth, principalController.deleteUser);

router.get('/', getUsers)
router.post('/', createUser)
router.get('/:id', getUserdetails)
router.put('/:id', editUser)
router.delete('/:id', deleteUser)

export default router;
