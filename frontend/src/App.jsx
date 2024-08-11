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


  useEffect(() => {
    axios.get("http://localhost:4000/api/principal").then((res) => {

      setUsers(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [users])

  return (
    <>
      <MyContext.Provider value={{ users, setUsers }}>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/principal-dashboard' element={<PrincipalDash />} />
            <Route path='/teacher-dashboard' element={<TeacherDash />} />
            <Route path='/student-dashboard' element={<StudentDash />} />
          </Routes>
        </Router>
      </MyContext.Provider>
    </>
  )
}

export default App


// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Login from './components/Login';
// import PrincipalDashboard from './components/PrincipalDashboard';
// import TeacherDashboard from './components/TeacherDashboard';
// import StudentView from './components/StudentView';

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/login" component={Login} />
//         <Route path="/principal-dashboard" component={PrincipalDashboard} />
//         <Route path="/teacher-dashboard" component={TeacherDashboard} />
//         <Route path="/student-view" component={StudentView} />
//         <Route path="/" component={Login} />
//       </Switch>
//     </Router>
//   );
// }

// export default App;
