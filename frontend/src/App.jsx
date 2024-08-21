import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import PrincipalDash from './pages/PrincipalDash'
import TeacherDash from './pages/TeacherDash'
import StudentDash from './pages/StudentDash'
import { MyContext } from './MyContext.js'
import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {

  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const [users, setUsers] = useState([])
  const [classrooms, setClassrooms] = useState([])
  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([]);
  const [userId, setUserId] = useState('')
  const [classStudents, setClassStudents] = useState([])

  const backendUrl = "https://classroom-backend-qjs4.onrender.com"

  useEffect(() => {

    axios.get(`${backendUrl}/api/principal`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then((res) => {

      setUsers(res.data.data)
      const onlyStudents = res.data.data.filter(
        (item) => item.userType === "Student"
      );
      setStudents(onlyStudents)
      const onlyTeachers = res.data.data.filter(
        (item) => item.userType === "Teacher"
      );

      setTeachers(onlyTeachers)

    }).catch((err) => {
      console.log(err)
    })
  }, [token])


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
  }, [token])


  return (
    <>
      <MyContext.Provider value={{ backendUrl, users, setUsers, classrooms, setClassrooms, teachers, setTeachers, userId, setUserId, token, setToken, students, setStudents, classStudents, setClassStudents }}>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/principal-dashboard/*" element={
            <ProtectedRoute allowedUserType="Principal">
              <PrincipalDash />
            </ProtectedRoute>
          } />

          <Route path='/teacher-dashboard/:userId/*' element={
            <ProtectedRoute allowedUserType="Teacher">
              <TeacherDash />
            </ProtectedRoute>
          } />

          <Route path='/student-dashboard/:userId/*' element={
            <ProtectedRoute allowedUserType="Student">
              <StudentDash userId={userId} />
            </ProtectedRoute>
          } />
        </Routes>

      </MyContext.Provider>
    </>
  )
}

export default App
