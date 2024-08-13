import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import PrincipalDash from './pages/PrincipalDash'
import TeacherDash from './pages/TeacherDash'
import StudentDash from './pages/StudentDash'
import { MyContext } from './MyContext.js'
import axios from 'axios';
function App() {

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
  }, [users])

  useEffect(() => {
    axios.get("http://localhost:4000/api/classroom").then((res) => {

      setClassrooms(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [classrooms])

  return (
    <>
      <MyContext.Provider value={{ users, setUsers, classrooms, setClassrooms, teachers, setTeachers, userId, setUserId }}>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/principal-dashboard' element={<PrincipalDash />} />
            <Route path='/teacher-dashboard' element={<TeacherDash userId={userId} />} />
            <Route path='/student-dashboard' element={<StudentDash userId={userId} />} />
          </Routes>
        </Router>
      </MyContext.Provider>
    </>
  )
}

export default App


