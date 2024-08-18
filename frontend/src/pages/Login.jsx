import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from '../MyContext';
import { useSnackbar } from 'notistack';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from 'axios'
const Login = () => {
    const [email, setEmail] = useState('')
    const [passType, setPassType] = useState(true)
    const [password, setPassword] = useState('')
    const [eye, setEye] = useState(false)
    const { userId, setUserId, token, setToken, backendUrl } = useContext(MyContext)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();

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
        axios.post(`${backendUrl}/api/login`, data).then((res) => {

            setToken(res.data.token)
            localStorage.setItem('authToken', res.data.token);
            localStorage.getItem('authToken');
            console.log(res.data.userId)
            setUserId(res.data.userId)


            // Setting up the Authorization header for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            if (res.data.userType === "Principal") {
                navigate("/principal-dashboard");
            }
            else if (res.data.userType === "Teacher") {
                navigate(`/teacher-dashboard/${res.data.userId}/class-students`);
            }
            else if (res.data.userType === "Student") {
                navigate(`/student-dashboard/${res.data.userId}/class-mates`);
            }

            enqueueSnackbar('Logged-In Succesfully ', { variant: 'success' });

        }).catch((error) => {
            console.log(error)
            enqueueSnackbar('Incorrect email or password', { variant: 'error' });
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
                    <div className="mb-6 relative">
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
                            type={passType ? "password" : "text"}
                            placeholder="Password"
                        />
                        <span onClick={() => {
                            setEye(!eye);
                            setPassType(!passType)
                        }} className="absolute right-2 top-9">{eye ? <FaEye size={20} /> : <FaEyeSlash size={20} />}</span>
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


// axios.post('http://localhost:4000/api/login', data, {
//     headers: {
//         Authorization: `Bearer ${token}`,
//     }
// })

