import React, { useState, useEffect, useContext } from 'react'
import { MyContext } from '../MyContext';
import { AiOutlineEdit } from 'react-icons/ai';
// import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import EditUser from './EditUser';
import axios from 'axios';

const StudentTable = () => {
    const [students, setStudents] = useState([])
    const [edit, setEdit] = useState(false)
    const [indexid, setIndexId] = useState()
    const { users, setUsers } = useContext(MyContext)

    useEffect(() => {
        axios.get("http://localhost:4000/api/principal").then((res) => {
            const onlyStudents = res.data.data.filter((item) => item.userType === "Student")
            setStudents(onlyStudents)
        }).catch((err) => {
            console.log(err)
        })
    }, [users]) // for first mount


    const handleDeleteUser = (id) => {
        axios.delete(`http://localhost:4000/api/principal/${id}`)
            .then((res) => {
                setUsers(res.data.data)
            })
            .catch((error) => {

                console.log(error)
            })
    };

    return (
        <>
            <div className='overflow-y-auto h-128'>
                <table className='w-full border-separate border-spacing-2 p-6'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Student Name</th>

                            <th className='border border-slate-600 rounded-md'>Email</th>
                            <th className='border border-slate-600 rounded-md'>Password</th>
                            <th className='border border-slate-600 rounded-md'>Operations</th>
                        </tr>
                    </thead>

                    <tbody>

                        {students.map((student, index) => (
                            <tr key={student._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {student.name}
                                </td>

                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {student.email}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {student.password}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    <div className='flex justify-center gap-x-4'>

                                        {/* <BsInfoCircle title="info" className='cursor-pointer text-2xl text-green-800' /> */}

                                        <AiOutlineEdit title="edit" className='cursor-pointer text-2xl text-yellow-800' onClick={() => { setEdit(true); setIndexId(student._id) }} />

                                        <MdOutlineDelete title="delete" className='cursor-pointer text-2xl text-red-800' onClick={() => { handleDeleteUser(student._id) }} />

                                    </div>

                                </td>
                            </tr>
                        ))
                        }

                    </tbody>

                </table>
            </div>
            {edit && <EditUser indexid={indexid} onClose={() => setEdit(false)} />
            }

        </>

    )
}

export default StudentTable

