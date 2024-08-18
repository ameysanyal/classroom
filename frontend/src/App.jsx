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
  const [students, setStudents] = useState([]);
  const [userId, setUserId] = useState('')
  const [classStudents, setClassStudents] = useState([])


  useEffect(() => {

    // console.log(token)

    axios.get("http://localhost:4000/api/principal", {
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
  }, [])

  useEffect(() => {
    axios.get("http://localhost:4000/api/classroom", {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then((res) => {

      setClassrooms(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])


  // useEffect(() => {
  //   const storedToken = localStorage.getItem('authToken');
  //   if (storedToken && storedToken !== token) {
  //     setToken(storedToken);
  //   }
  // }, []);


  return (
    <>
      <MyContext.Provider value={{ users, setUsers, classrooms, setClassrooms, teachers, setTeachers, userId, setUserId, token, setToken, students, setStudents, classStudents, setClassStudents }}>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/principal-dashboard/*" element={<PrincipalDash />} />
          <Route path='/teacher-dashboard/:userId/*' element={<TeacherDash />} />

          <Route path='/student-dashboard/:userId/*' element={<StudentDash userId={userId} />} />
        </Routes>


      </MyContext.Provider>
    </>
  )
}

export default App