import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from '../MyContext';
import axios from 'axios'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUserId } = useContext(MyContext)
    const navigate = useNavigate()

    const bg = {
        backgroundImage:
            "url('../../public/bg-image.jpg')",
        height: "100vh",

        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    const validateCredentials = (e) => {
        e.preventDefault();
        const data = {
            email, password
        }
        // console.log(data)
        axios.post('http://localhost:4000/api/login', data).then((res) => {



            setUserId(res.data.userId)

            if (res.data.userType === "Principal") {
                navigate("/principal-dashboard");
            }
            else if (res.data.userType === "Teacher") {
                navigate("/teacher-dashboard");
            }
            else if (res.data.userType === "Student") {
                navigate("/student-dashboard");
            }


        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100" style={bg}>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-2xl font-bold text-center m-2">Classrooms</h1>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex items-center justify-center">

                        <button onClick={validateCredentials} className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Login
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
