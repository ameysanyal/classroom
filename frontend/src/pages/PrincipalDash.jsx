import React, { useContext, useEffect } from 'react'
import TeacherTable from '../components/TeacherTable'
import StudentTable from '../components/StudentTable'
import ClassroomTable from '../components/ClassroomTable'
import CreateTeacher from '../components/CreateTeacher'
import CreateStudent from '../components/CreateStudent'
import CreateClassroom from '../components/CreateClassroom'
import { NavLink, useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';
import { MyContext } from '../MyContext';


const PrincipalDash = () => {
    const { users, setUsers, teachers, students, classrooms, setTeachers, setStudents, setClassrooms, setUserId, setToken } = useContext(MyContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        setUserId('')
        setToken('')
        localStorage.removeItem('authToken');
        navigate('/')

    }

    useEffect(() => {
        console.log(`in effect of pdash`)
        setUsers(users)
        setTeachers(teachers)
        setStudents(students)
        setClassrooms(classrooms)

    }, [teachers, students, classrooms])

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
            <div className="w-full lg:w-1/6 bg-gray-800 text-white p-4">
                <div className="text-2xl font-bold mb-6">ClassRooms</div>
                <nav>
                    <NavLink
                        to='teacher-table'
                        className={({ isActive }) => isActive ? "block py-2.5 px-4 w-full text-left rounded bg-gray-700" : "block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700"}
                    >
                        Teachers
                    </NavLink>

                    <NavLink
                        to='student-table'
                        className={({ isActive }) => isActive ? "block py-2.5 px-4 w-full text-left rounded bg-gray-700" : "block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700"}
                    >
                        Students
                    </NavLink>

                    <NavLink
                        to='classroom-table'
                        className={({ isActive }) => isActive ? "block py-2.5 px-4 w-full text-left rounded bg-gray-700" : "block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700"}
                    >
                        Classrooms
                    </NavLink>

                    <NavLink
                        to='create-teacher'
                        className={({ isActive }) => isActive ? "block py-2.5 px-4 w-full text-left rounded bg-gray-700" : "block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700"}
                    >
                        Add Teachers
                    </NavLink>

                    <NavLink
                        to='create-student'
                        className={({ isActive }) => isActive ? "block py-2.5 px-4 w-full text-left rounded bg-gray-700" : "block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700"}
                    >
                        Add Students
                    </NavLink>

                    <NavLink
                        to='create-classroom'
                        className={({ isActive }) => isActive ? "block py-2.5 px-4 w-full text-left rounded bg-gray-700" : "block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700"}
                    >
                        Add Classrooms
                    </NavLink>

                    <button onClick={handleLogout} className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Logout</button>
                </nav>
            </div>

            <div className="flex-1 p-6">
                <header className="flex mb-6">
                    <h1 className="text-xl font-semibold">Admin <br />Dashboard</h1>

                    <h1 className="text-xl font-semibold flex-grow text-center">Welcome, Principal</h1>

                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white flex justify-center items-center p-4 h-full rounded shadow">
                        <p className="text-xl font-bold">Total Teachers: {teachers.length}</p>
                    </div>
                    <div className="bg-white flex justify-center items-center p-4 h-full rounded shadow">
                        <p className="text-xl font-bold">Total Students: {students.length}</p>
                    </div>
                    <div className="bg-white flex justify-center items-center p-4 h-full rounded shadow">
                        <p className="text-xl font-bold">Total Classrooms: {classrooms.length}</p>
                    </div>
                </div>

                <Routes>
                    <Route path='teacher-table' element={<TeacherTable />} />
                    <Route path='student-table' element={<StudentTable />} />
                    <Route path='classroom-table' element={<ClassroomTable />} />
                    <Route path='create-teacher' element={<CreateTeacher />} />
                    <Route path='create-student' element={<CreateStudent />} />
                    <Route path='create-classroom' element={<CreateClassroom />} />
                    <Route path="*" element={<TeacherTable />} />
                </Routes>
            </div>
        </div>
    )
}

export default PrincipalDash

