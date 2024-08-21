import React, { useState, useEffect, useContext } from 'react'
import { MyContext } from '../MyContext'
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { useSnackbar } from 'notistack';
import axios from 'axios'


const CreateClassroom = () => {

    const days = ["Select Day", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const { enqueueSnackbar } = useSnackbar();
    const { backendUrl, teachers, classrooms, setClassrooms, token } = useContext(MyContext)
    const [teacher, setTeacher] = useState('')
    const [notAssigned, setNotAssigned] = useState([])

    const [name, setName] = useState('')
    const [startTime, setStartTime] = useState('10:00')
    const [endTime, setEndTime] = useState('10:00')
    const [startDay, setStartDay] = useState('')
    const [endDay, setEndDay] = useState('')

    const handleSaveClassroom = () => {

        if (startDay === "Select Day" || startDay === '' || endDay === "Select Day" || endDay === '') {
            enqueueSnackbar('Please select a both days.', { variant: 'warning' });
            return;
        }

        const data = {
            name,
            teacher,
            schedule: [
                {
                    startTime,
                    endTime,
                    startDay,
                    endDay
                }
            ]
        };
        // console.table(data)
        axios.post(`${backendUrl}/api/classroom`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {

                const updated = [...classrooms, res.data]
                setClassrooms(updated)

                await axios.patch(`${backendUrl}/api/principal/${teacher}`, { classroomId: res.data._id }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                axios.get(`${backendUrl}/api/classroom`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }).then((res) => {

                    setClassrooms(res.data.data)


                }).catch((err) => {
                    console.log(err)
                })

                // Recalculate not assigned teachers
                calculateNotAssignedTeachers();
                setName('')
                setStartTime('10:00')
                setEndTime('10:00')
                setStartDay('')
                setEndDay('')

                enqueueSnackbar('Classroom Created Successfully', { variant: 'success' });


            }).catch((error) => {
                console.log(error);
                enqueueSnackbar('Failed to create Classroom, Teacher is Required', { variant: 'error' });
            })
    }


    const calculateNotAssignedTeachers = () => {
        const notAssignedTeachers = [];

        for (let j = 0; j < teachers.length; j++) {
            let isAssigned = false;

            for (let i = 0; i < classrooms.length; i++) {

                console.log(classrooms[i])
                if (classrooms[i].teacher && classrooms[i].teacher._id === teachers[j]._id) {
                    isAssigned = true;
                    break;
                }
            }

            if (!isAssigned) {
                notAssignedTeachers.push(teachers[j]);
            }
        }

        setNotAssigned(notAssignedTeachers);

    };

    useEffect(() => {
        calculateNotAssignedTeachers();

    }, [classrooms]);

    return (

        <div className='flex flex-row justify-center items-center m-10'>
            <div className='flex flex-col border-2 border-gray-800  rounded-xl w-[600px] p-2 mx-auto'>
                <div className='flex my-2'>
                    <label className='text-xl mr-2'>Name:</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border-2 border-gray-500 p-1 w-full'
                    />
                </div>
                <div className='my-2'>
                    <label className='text-xl m-2' htmlFor="teacher">Assign Teacher:</label>
                    <select
                        value={teacher}
                        onChange={(e) => {
                            setTeacher(e.target.value)
                        }}
                        className='border-2 border-gray-500 p-1 w-1/3' name="teacher" id="teacher">
                        <option>Select Teacher</option>
                        {notAssigned.map((na, i) => <option key={i} value={na._id}>{na.name}</option>)}
                    </select>
                </div>
                <div className='flex items-center justify-center my-2'>
                    <label className='text-xl m-2'>StartDay:</label>
                    <select
                        value={startDay}
                        onChange={(e) => {
                            setStartDay(e.target.value)
                        }}
                        className='border-2 border-gray-500 p-1 w-1/4' name="startDay" id="startDay">
                        {days.map((d, i) => <option key={i} value={d}>{d}</option>)}
                    </select>
                    <label className='text-xl m-2'>EndDay:</label>
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
                    <label className='text-xl m-2'>StartTime:</label>
                    <TimePicker className="border-1 border-gray-500 p-1" disableClock={true} onChange={setStartTime} value={startTime} format="h:mm a" />
                    <label className='text-xl m-2'>EndTime:</label>
                    <TimePicker className="border-1 border-gray-500 p-1" disableClock={true} onChange={setEndTime} value={endTime} format="h:mm a" />
                </div>

                <button className='p-2 bg-gray-800  m-2 w-1/4 font-bold self-center text-white' onClick={handleSaveClassroom}>
                    Save
                </button>
            </div>
        </div>

    )
}

export default CreateClassroom


