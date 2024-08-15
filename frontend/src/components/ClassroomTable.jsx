import React, { useEffect, useContext } from 'react'
import { MyContext } from '../MyContext';
import { MdOutlineDelete } from 'react-icons/md';
import axios from 'axios';
const ClassroomTable = () => {
    const { classrooms, setClassrooms, token } = useContext(MyContext)

    useEffect(() => {
        axios.get("http://localhost:4000/api/classroom", {
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
        axios.delete(`http://localhost:4000/api/classroom/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
            .then(() => {
                setClassrooms(classrooms.filter(classroom => classroom._id !== id));
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <>
            <table className='w-full border-separate border-spacing-2 p-6'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>No</th>
                        <th className='border border-slate-600 rounded-md'> Classroom Name</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Teacher Assigned</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>No. of Students</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Days</th>
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
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {classroom.teacher}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {classroom.students.length}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {/* {classroom.schedule?.startDay} to {classroom.schedule?.endDay} this is not valid */}
                                {classroom.schedule.map((scheduleItem, i) => (
                                    <div key={i}>
                                        {scheduleItem.startDay} to {scheduleItem.endDay}
                                    </div>
                                ))}

                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {classroom.schedule.map((scheduleItem, i) => (
                                    <div key={i}>
                                        {scheduleItem.startTime} to {scheduleItem.endTime}
                                    </div>
                                ))}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                <div className='flex justify-center gap-x-4'>


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

        </>
    )
}

export default ClassroomTable
