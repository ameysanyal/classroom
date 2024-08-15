import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import PrincipalDash from './pages/PrincipalDash'
import TeacherDash from './pages/TeacherDash'
import StudentDash from './pages/StudentDash'
import { MyContext } from './MyContext.js'
import axios from 'axios';
function App() {

  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const [users, setUsers] = useState([])
  const [classrooms, setClassrooms] = useState([])
  const [teachers, setTeachers] = useState([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    axios.get("http://localhost:4000/api/principal").then((res) => {

      setUsers(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:4000/api/classroom").then((res) => {

      setClassrooms(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <>
      <MyContext.Provider value={{ users, setUsers, classrooms, setClassrooms, teachers, setTeachers, userId, setUserId, token, setToken }}>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/principal-dashboard/*" element={<PrincipalDash />} />
          <Route path='/teacher-dashboard' element={<TeacherDash userId={userId} />} />
          <Route path='/student-dashboard' element={<StudentDash userId={userId} />} />
        </Routes>


      </MyContext.Provider>
    </>
  )
}

export default App