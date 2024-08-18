import React, { useEffect, useContext, useState } from 'react'
import { MyContext } from '../MyContext';
import { MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import axios from 'axios';
import EditClassroom from './EditClassroom';
import { useSnackbar } from 'notistack';

const ClassroomTable = () => {
    const { backendUrl, classrooms, setClassrooms, token } = useContext(MyContext)
    const [edit, setEdit] = useState(false)
    const [indexId, setIndexId] = useState()
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        axios.get(`${backendUrl}/api/classroom`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {

            setClassrooms(res.data.data)


        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const handleDeleteClassroom = (id) => {
        axios.delete(`${backendUrl}/api/classroom/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
            .then(() => {
                setClassrooms(classrooms.filter(classroom => classroom._id !== id));
                enqueueSnackbar('Deleted Classroom Successfully', { variant: 'success' });
            })
            .catch(err => {
                console.error(err);
                enqueueSnackbar('Failed to delete Classroom', { variant: 'error' });

            });
    };

    return (
        <>
            <div className='overflow-y-auto h-128'>
                <table className='w-full border-separate border-spacing-2 p-6'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'> Classroom Name</th>
                            <th className='border border-slate-600 rounded-md'>Teacher Assigned</th>
                            <th className='border border-slate-600 rounded-md'>No. of Students</th>
                            <th className='border border-slate-600 rounded-md'>Days</th>
                            <th className='border border-slate-600 rounded-md'>Timing</th>
                            <th className='border border-slate-600 rounded-md'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>

                        {classrooms.map((classroom, index) => (

                            <tr key={classroom._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {classroom.name}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {classroom.teacher ? classroom.teacher.name : "None"}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {classroom.students.length}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {/* {classroom.schedule?.startDay} to {classroom.schedule?.endDay} this is not valid */}
                                    {classroom.schedule.map((scheduleItem, i) => (
                                        <div key={i}>
                                            {scheduleItem.startDay} to {scheduleItem.endDay}
                                        </div>
                                    ))}

                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {classroom.schedule.map((scheduleItem, i) => (
                                        <div key={i}>
                                            {scheduleItem.startTime} to {scheduleItem.endTime}
                                        </div>
                                    ))}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <AiOutlineEdit title="edit" className='cursor-pointer text-2xl text-yellow-800' onClick={() => { setEdit(true); setIndexId(classroom._id) }} />


                                        <MdOutlineDelete
                                            title="delete"
                                            className='cursor-pointer text-2xl text-red-800'
                                            onClick={() => handleDeleteClassroom(classroom._id)}
                                        />
                                    </div>

                                </td>
                            </tr>
                        ))
                        }

                    </tbody>
                </table>
                {edit && <EditClassroom indexId={indexId} onClose={() => setEdit(false)} />}
            </div>
        </>
    )
}

export default ClassroomTable
