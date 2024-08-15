import express from 'express'
import auth from '../middlewares/auth.js'
import { getUserdetails, getUsers, createUser, deleteUser, editUser } from '../controllers/principal.controller.js'
const router = express.Router();


router.get('/', auth, getUsers)
router.post('/', auth, createUser)
router.get('/:id', auth, getUserdetails)
router.put('/:id', auth, editUser)
router.delete('/:id', auth, deleteUser)

export default router;
