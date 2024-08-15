import React from 'react'
import TeacherTable from '../components/TeacherTable'
import StudentTable from '../components/StudentTable'
import ClassroomTable from '../components/ClassroomTable'
import CreateTeacher from '../components/CreateTeacher'
import CreateStudent from '../components/CreateStudent'
import CreateClassroom from '../components/CreateClassroom'
import { useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';


const PrincipalDash = () => {

    const navigate = useNavigate()


    const handleLogout = () => {
        navigate('/')
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
            <div className="w-full lg:w-1/6 bg-gray-800 text-white p-4">
                <div className="text-2xl font-bold mb-6">ClassRooms</div>
                <nav>
                    <button onClick={() => { navigate('teacher-table') }} className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Teachers</button>

                    <button onClick={() => { navigate('student-table') }} className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Students</button>

                    <button onClick={() => { navigate('classroom-table') }} className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Classrooms</button>

                    <button onClick={() => { navigate('create-teacher') }} className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Add Teachers</button>
                    <button onClick={() => { navigate('create-student') }} className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Add Students</button>
                    <button onClick={() => { navigate('create-classroom') }} className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Add Classrooms</button>
                    <button onClick={handleLogout} className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Logout</button>
                </nav>
            </div>

            <div className="flex-1 p-6">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-semibold">Admin <br />Dashboard</h1>
                    <h1 className="text-xl font-semibold">Welcome, Principal</h1>
                    <div className='flex justify-end'>
                        <button className="bg-blue-600 text-white px-2 py-1 m-1 rounded hover:bg-blue-500">Add New User</button>
                        <button className="bg-blue-600 text-white px-2 py-1 m-1 rounded hover:bg-blue-500">Add New Classroom</button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="bg-white flex justify-center items-center p-4 h-full rounded shadow">
                        <p className="text-xl font-bold">Total Teachers: 500</p>
                    </div>
                    <div className="bg-white flex justify-center items-center p-4 h-full rounded shadow">
                        <p className="text-xl font-bold">Total Students: 500</p>
                    </div>

                    <div className="bg-white flex justify-center items-center p-4 h-full rounded shadow">
                        <p className="text-xl font-bold">Total Classrooms: 500</p>
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


// { display.teacher && <TeacherTable /> }
// { display.student && <StudentTable /> }
// { display.classroom && <ClassroomTable /> }
// { addUser && <CreateTeacher userArray={userArray} /> }
// { addClassroom && <CreateClassroom onClose={() => setAddClassroom(false)} /> }