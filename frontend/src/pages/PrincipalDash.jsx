import React, { useState } from 'react'
import TeacherTable from '../components/TeacherTable'
import StudentTable from '../components/StudentTable'
import ClassroomTable from '../components/ClassroomTable'
import CreateUser from '../components/CreateUser'
const PrincipalDash = () => {

    const [addUser, setAddUser] = useState(false)
    const [display, setDisplay] = useState({
        teacher: true,
        student: false,
        classroom: false,
    })

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
            <div className="w-full lg:w-1/6 bg-gray-800 text-white p-4">
                <div className="text-2xl font-bold mb-6">ClassRooms</div>
                <nav>
                    <button onClick={() => setDisplay({
                        teacher: true,
                        student: false,
                        classroom: false,
                    })} className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Teachers</button>

                    <button onClick={() => setDisplay({
                        teacher: false,
                        student: true,
                        classroom: false,
                    })} className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Students</button>

                    <button onClick={() => setDisplay({
                        teacher: false,
                        student: false,
                        classroom: true,
                    })} className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Classrooms</button>

                    <button className="block py-2.5 px-4 w-full text-left rounded hover:bg-gray-700">Logout</button>
                </nav>
            </div>

            <div className="flex-1 p-6">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <h1 className="text-2xl font-semibold">Welcome, UserName</h1>
                    <button onClick={() => setAddUser(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Add New User</button>
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
                {display.teacher && <TeacherTable />}
                {display.student && <StudentTable />}
                {display.classroom && <ClassroomTable />}
                {addUser && <CreateUser onClose={() => setAddUser(false)} />}
            </div>
        </div>

    )
}

export default PrincipalDash
