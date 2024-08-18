import React, { useContext, useState, useEffect } from 'react'
import StudentTable from '../components/StudentTable'
import CreateStudent from '../components/CreateStudent'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';
import { MyContext } from '../MyContext';
import ClassStudents from '../components/ClassStudents'
import { useParams } from 'react-router-dom';
import ClassDetails from '../components/ClassDetails'


const TeacherDash = () => {

    const { backendUrl, setUserId, token, setToken } = useContext(MyContext)
    const { userId } = useParams();


    const [userName, setUserName] = useState('')
    const [loginTeacher, setLoginTeacher] = useState()

    const navigate = useNavigate()

    const handleLogout = () => {
        setUserId('')
        setToken('')
        localStorage.removeItem('authToken');
        navigate('/')
    }

    useEffect(() => {

        axios.get(`${backendUrl}/api/principal/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {
            setUserName(res.data.name)
            setLoginTeacher(res.data)
            setCurrentTeacherStudents(res.data.classroom.students)

            console.log(`teacherstudents = ${currentTeacherStudents}`)

        }).catch((err) => {
            console.log(err)
        })

    }, [userName])


    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
            <div className="w-full lg:w-1/6 bg-gray-800 text-white p-4">
                <div className="text-2xl font-bold mb-6">ClassRooms</div>
                <nav>
                    <NavLink
                        to='class-students'
                        className={({ isActive }) => isActive ? "block py-2.5 px-4 w-full text-left rounded bg-gray-700" : "block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700"}
                    >
                        Class Students
                    </NavLink>
                    <NavLink
                        to='class-details'
                        className={({ isActive }) => isActive ? "block py-2.5 px-4 w-full text-left rounded bg-gray-700" : "block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700"}
                    >
                        Class Details
                    </NavLink>
                    <NavLink
                        to='student-table'
                        className={({ isActive }) => isActive ? "block py-2.5 px-4 w-full text-left rounded bg-gray-700" : "block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700"}
                    >
                        All Students
                    </NavLink>

                    <NavLink
                        to='create-student'
                        className={({ isActive }) => isActive ? "block py-2.5 px-4 w-full text-left rounded bg-gray-700" : "block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700"}
                    >
                        Add Students
                    </NavLink>

                    <button onClick={handleLogout} className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Logout</button>
                </nav>
            </div>

            <div className="flex-1 p-6">
                <header className="flex mb-6">
                    <h1 className="text-xl font-semibold">Teacher <br />Dashboard</h1>

                    <h1 className="text-xl font-semibold flex-grow text-center">Welcome, {userName}</h1>

                </header>

                <Routes>

                    <Route path='class-students' element={<ClassStudents loggedIn={loginTeacher} userName={userName} />} />
                    <Route path='class-details' element={<ClassDetails loggedIn={loginTeacher} />} />
                    <Route path='student-table' element={<StudentTable />} />
                    <Route path='create-student' element={<CreateStudent />} />
                    <Route path="*" element={<ClassStudents loggedIn={loginTeacher} userName={userName} />} />
                </Routes>
            </div>
        </div>
    )
}

export default TeacherDash

