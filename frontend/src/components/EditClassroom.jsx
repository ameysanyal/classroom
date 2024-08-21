import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { MdOutlineClose } from "react-icons/md"
import { MyContext } from '../MyContext';
import { useSnackbar } from 'notistack';
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';


const EditClassroom = ({ onClose, indexId }) => {

    const days = ["Select Day", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const [name, setName] = useState('')
    const [startTime, setStartTime] = useState('10:00')
    const [endTime, setEndTime] = useState('10:00')
    const [startDay, setStartDay] = useState('')
    const [classTeacher, setClasTeacher] = useState()
    const [endDay, setEndDay] = useState('')
    const { backendUrl, token, classrooms, setClassrooms } = useContext(MyContext)
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {

        axios.get(`${backendUrl}/api/classroom/${indexId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then((response) => {

            setClasTeacher(response.data.teacher)
            setName(response.data.name)

        }).catch((error) => {

            console.log(error)
        })
    }, [])

    const handleEditClassroom = () => {
        console.log("Start Day:", startDay);
        console.log("End Day:", endDay);

        if (startDay === "Select Day" || startDay === '' || endDay === "Select Day" || endDay === '') {
            enqueueSnackbar('Please select a both days.', { variant: 'warning' });
            return;
        }


        const data = {
            name,
            startDay,
            endDay,
            startTime,
            endTime
        }

        axios.put(`${backendUrl}/api/classroom/${indexId}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((res) => {

                console.log(res.data.classroom)

                const stateUpdate = {
                    "_id": indexId,
                    name,
                    "teacher": classTeacher,
                    "students": res.data.classroom.students,
                    "schedule": [
                        {
                            startDay,
                            endDay,
                            startTime,
                            endTime

                        }
                    ]
                }

                const update = classrooms.map((item) => {
                    if (item._id === indexId) {
                        return stateUpdate;
                    }
                    return item
                })

                setClassrooms(update)


                onClose()
                enqueueSnackbar('Details Updated Successfully', { variant: 'success' });
            }).catch((error) => {
                console.log(error)
                enqueueSnackbar('Failed to Update Details', { variant: 'error' });
            })
    }


    return (
        <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex flex-col justify-center items-center">
            <div className="bg-gray-800 flex flex-col rounded-md p-2 relative w-1/2" onClick={(e) => { e.stopPropagation() }}>
                <MdOutlineClose className='text-white m-1 cursor-pointer absolute top-4 right-4' title="close" size={30} onClick={onClose} />
                <h2 className='text-2xl text-white m-2 text-center'>Edit Classroom Details</h2>

                <div className='flex flex-row justify-center items-center'>
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-2 mx-auto'>

                        <div className='flex my-2'>
                            <label className='text-xl mr-4 text-white'>Name:</label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='border-2 border-gray-500 p-1 w-full'
                            />
                        </div>
                        <div className='flex items-center justify-center my-2'>
                            <label className='text-xl m-2 text-white'>StartDay:</label>
                            <select
                                value={startDay}
                                onChange={(e) => {
                                    setStartDay(e.target.value)
                                }}
                                className='border-2 border-gray-500 p-1 w-1/4' name="startDay" id="startDay">
                                {days.map((d, i) => <option key={i} value={d}>{d}</option>)}
                            </select>
                            <label className='text-xl m-2 text-white'>EndDay:</label>
                            <select
                                value={endDay}
                                onChange={(e) => {
                                    setEndDay(e.target.value)
                                }}
                                className='border-2 border-gray-500 p-1 w-1/4' name="endDay" id="endDay">
                                {days.map((d, i) => <option key={i} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div className='flex items-center justify-center my-2'>
                            <label className='text-xl m-4 text-white'>StartTime:</label>
                            <TimePicker className="border-1 border-gray-500 p-1 bg-white" disableClock={true} onChange={setStartTime} value={startTime} format="h:mm a" />
                            <label className='text-xl m-4 text-white'>EndTime:</label>
                            <TimePicker className="border-1 border-gray-500 p-1 bg-white" disableClock={true} onChange={setEndTime} value={endTime} format="h:mm a" />

                        </div>
                        <button className='p-2 bg-sky-300 m-2 w-1/2 self-center' onClick={handleEditClassroom}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditClassroom


