import React, { useState, useEffect, useContext } from 'react'
import { MyContext } from '../MyContext';
import { AiOutlineEdit } from 'react-icons/ai';
// import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import EditUser from './EditUser';
import axios from 'axios';

const TeacherTable = () => {
    const [teachers, setTeachers] = useState([])
    const [edit, setEdit] = useState(false)
    const [indexid, setIndexId] = useState()
    const { users, setUsers } = useContext(MyContext)

    useEffect(() => {
        axios.get("http://localhost:4000/api/principal").then((res) => {
            const onlyTeachers = res.data.data.filter((item) => item.userType === "Teacher")
            setTeachers(onlyTeachers)
        }).catch((err) => {
            console.log(err)
        })
    }, [users]) // for first mount


    const handleDeleteUser = (id) => {
        axios.delete(`http://localhost:4000/api/principal/${id}`)
            .then((res) => {
                const newUsers = res.data.data.filter((item) => item.id !== id)
                setUsers(newUsers)
            })
            .catch((error) => {

                console.log(error)
            })
    };

    return (
        <>
            <table className='w-full border-separate border-spacing-2 p-6'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>No</th>
                        <th className='border border-slate-600 rounded-md'> Teacher Name</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Assigned Classroom</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Email</th>
                        <th className='border border-slate-600 rounded-md'>Password</th>
                        <th className='border border-slate-600 rounded-md'>Operations</th>
                    </tr>
                </thead>
                <tbody>

                    {teachers.map((teacher, index) => (
                        <tr key={teacher._id} className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {teacher.name}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {teacher.assignedClassroom}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {teacher.email}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {teacher.password}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                <div className='flex justify-center gap-x-4'>

                                    {/* <BsInfoCircle title="info" className='cursor-pointer text-2xl text-green-800' /> */}

                                    <AiOutlineEdit title="edit" className='cursor-pointer text-2xl text-yellow-800' onClick={() => { setEdit(true); setIndexId(teacher._id) }} />

                                    <MdOutlineDelete title="delete" className='cursor-pointer text-2xl text-red-800' onClick={() => { handleDeleteUser(teacher._id) }} />

                                </div>

                            </td>
                        </tr>
                    ))
                    }

                </tbody>
            </table>
            {edit && <EditUser indexid={indexid} onClose={() => setEdit(false)} />}
        </>

    )
}

export default TeacherTable
