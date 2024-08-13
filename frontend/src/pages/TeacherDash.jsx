import React, { useState, useEffect, useContext } from 'react'
import { MyContext } from '../MyContext';
import StudentTable from '../components/StudentTable'
import CreateUser from '../components/CreateUser'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const TeacherDash = () => {
    const userArray = ["SelectUser", "Student"]
    const { userId } = useContext(MyContext)
    const [addUser, setAddUser] = useState(false)
    const [userName, setUserName] = useState('')
    const navigate = useNavigate()
    const [display, setDisplay] = useState({
        teacher: false,
        student: true,
        classroom: false,
    })

    const handleLogout = () => {
        navigate('/')
    }

    useEffect(() => {
        console.log(userId)
        axios.get(`http://localhost:4000/api/principal/${userId}`).then((res) => {
            setUserName(res.data.name)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
            <div className="w-full lg:w-1/6 bg-gray-800 text-white p-4">
                <div className="text-2xl font-bold mb-6">ClassRooms</div>
                <nav>
                    <button onClick={() => setDisplay({
                        teacher: false,
                        student: true,
                        classroom: false,
                    })} className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Students</button>

                    <button onClick={handleLogout} className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Logout</button>
                </nav>
            </div>

            <div className="flex-1 p-6">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-semibold">Teacher <br />Dashboard</h1>
                    <h1 className="text-xl font-semibold">Welcome, {userName}</h1>
                    <div className='flex justify-end'>
                        <button onClick={() => setAddUser(true)} className="bg-blue-600 text-white px-2 py-1 m-1 rounded hover:bg-blue-500">Add New Student</button>
                    </div>
                </header>

                <div>
                    your assigned classroom
                </div>
                {display.student && <StudentTable />}

                {addUser && <CreateUser userArray={userArray} onClose={() => setAddUser(false)} />}

            </div>
        </div>
    )
}

export default TeacherDash

