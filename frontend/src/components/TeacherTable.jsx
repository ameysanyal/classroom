import React, { useState, useEffect, useContext } from 'react'
import { MyContext } from '../MyContext';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import EditTeacher from "./EditTeacher"

import axios from 'axios';
import { useSnackbar } from 'notistack'
const TeacherTable = () => {

    const [edit, setEdit] = useState(false)
    const [indexId, setIndexId] = useState()
    const { users, setUsers, token } = useContext(MyContext)
    const { backendUrl, teachers, setTeachers } = useContext(MyContext)
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {

        axios.get(`${backendUrl}/api/principal`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {
            console.log(res.data)
            const onlyTeachers = res.data.data.filter((item) => item.userType === "Teacher")
            setTeachers(onlyTeachers)
        }).catch((err) => {
            console.log(err)
        })
    }, [users])


    const handleDeleteUser = (id) => {

        axios.delete(`${backendUrl}/api/principal/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {

            const newUsers = users.filter((item) => item.id !== id)
            setUsers(newUsers)
            enqueueSnackbar('Teacher Deleted Successfully', { variant: 'success' });
        })
            .catch((error) => {
                enqueueSnackbar('Failed to Delete teacher', { variant: 'error' });
                console.log(error)
            })
    };

    return (
        <>
            <div className='overflow-y-auto h-128'>
                <table className='w-full border-separate border-spacing-2 p-1'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'> Teacher Name</th>
                            <th className='border border-slate-600 rounded-md'>Class Assigned</th>
                            <th className='border border-slate-600 rounded-md'>Email</th>
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
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {teacher.classroom ? teacher.classroom.name : "None"}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {teacher.email}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center break-all'>
                                    {teacher.password}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>



                                        <AiOutlineEdit title="edit" className='cursor-pointer text-2xl text-yellow-800' onClick={() => { setEdit(true); setIndexId(teacher._id) }} />

                                        <MdOutlineDelete title="delete" className='cursor-pointer text-2xl text-red-800' onClick={() => { handleDeleteUser(teacher._id) }} />

                                    </div>

                                </td>
                            </tr>
                        ))
                        }

                    </tbody>
                </table>
                {edit && <EditTeacher indexId={indexId} onClose={() => setEdit(false)} />}
            </div>
        </>

    )
}

export default TeacherTable
