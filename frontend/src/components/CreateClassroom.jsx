import React, { useState, useEffect, useContext } from 'react'
import { MdOutlineClose } from "react-icons/md"
import { MyContext } from '../MyContext'
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import axios from 'axios'


const CreateClassroom = ({ onClose }) => {

    const days = ["Select Day", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const { teachers, classrooms, setClassrooms } = useContext(MyContext)
    const [assignTeacher, setAssignTeacher] = useState('teacherdef')
    const [notAssigned, setNotAssigned] = useState([])
    const [name, setName] = useState('')
    const [startTime, setStartTime] = useState('10:00')
    const [endTime, setEndTime] = useState('10:00')
    const [startDay, setStartDay] = useState('')
    const [endDay, setEndDay] = useState('')

    const handleSaveClassroom = () => {

        const data = {
            name,
            teacher: assignTeacher,
            schedule: [
                {
                    startTime,
                    endTime,
                    startDay,
                    endDay
                }
            ]
        };
        console.table(data)
        axios.post('http://localhost:4000/api/classroom', data)
            .then((res) => {
                console.log(res)
                const updated = [...classrooms, res.data]
                setClassrooms(updated)
                onClose()
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        const notAssignedTeachers = []

        for (let j = 0; j < teachers.length; j++) {
            let isAssigned = false;

            for (let i = 0; i < classrooms.length; i++) {
                if (classrooms[i].teacher === teachers[j].name) {
                    isAssigned = true;

                }
            }

            if (!isAssigned) {
                notAssignedTeachers.push(teachers[j]);
            }
        }
        setNotAssigned(notAssignedTeachers)


    }, [])

    return (
        <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex flex-col justify-center items-center">
            <div className="bg-gray-800 flex flex-col rounded-md p-2 relative w-1/2" onClick={(e) => { e.stopPropagation() }}>
                <MdOutlineClose className='text-white m-1 cursor-pointer absolute top-4 right-4' title="close" size={30} onClick={onClose} />
                <h2 className='text-2xl text-white m-2 text-center'>Create Classroom</h2>

                <div className='flex flex-row justify-center items-center'>
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-2 mx-auto'>
                        <div className='my-2'>
                            <label className='text-xl mr-4 text-white'>Name</label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='border-2 border-gray-500 p-1 w-full'
                            />
                        </div>
                        <div className='my-2'>
                            <label className='text-xl mr-4 text-white' htmlFor="teacher">Assign Teacher</label>
                            <select
                                value={assignTeacher}
                                onChange={(e) => {
                                    setAssignTeacher(e.target.value)
                                }}
                                className='border-2 border-gray-500 p-1 w-1/3' name="teacher" id="teacher">

                                {notAssigned.map((na, i) => <option key={i} value={na.name}>{na.name}</option>)}
                            </select>
                        </div>
                        <div className='my-2'>
                            <label className='text-xl m-2 text-white'>StartDay:</label>
                            <select
                                value={startDay}
                                onChange={(e) => {
                                    setStartDay(e.target.value)
                                }}
                                className='border-2 border-gray-500 p-1 w-1/3' name="startDay" id="startDay">
                                {days.map((d, i) => <option key={i} value={d}>{d}</option>)}
                            </select>
                            <label className='text-xl m-2 text-white'>EndDay:</label>
                            <select
                                value={endDay}
                                onChange={(e) => {
                                    setEndDay(e.target.value)
                                }}
                                className='border-2 border-gray-500 p-1 w-1/3' name="endDay" id="endDay">
                                {days.map((d, i) => <option key={i} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div className='my-2'>
                            <label className='text-xl m-4 text-white'>StartTime:</label>
                            <TimePicker onChange={setStartTime} value={startTime} format="h:mm a" />
                            <label className='text-xl m-4 text-white'>EndTime:</label>
                            <TimePicker onChange={setEndTime} value={endTime} format="h:mm a" />

                        </div>

                        <button className='p-2 bg-sky-300 m-2 w-1/2 self-center' onClick={handleSaveClassroom}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateClassroom
