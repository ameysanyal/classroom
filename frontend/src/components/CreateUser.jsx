import React, { useState, useEffect } from 'react'
import { MdOutlineClose } from "react-icons/md"
import axios from 'axios'

const CreateUser = ({ onClose, userArray }) => {
    const [userType, setUserType] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSaveUser = () => {

        const data = {
            userType,
            name,
            email,
            password,
        };
        console.table(data)
        axios.post('http://localhost:4000/api/principal', data)
            .then((res) => {
                console.log(res)
                onClose()
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex flex-col justify-center items-center">
            <div className="bg-gray-800 flex flex-col rounded-md p-2 relative w-1/2" onClick={(e) => { e.stopPropagation() }}>
                <MdOutlineClose className='text-white m-1 cursor-pointer absolute top-4 right-4' title="close" size={30} onClick={onClose} />
                <h2 className='text-2xl text-white m-2 text-center'>Create User</h2>

                <div className='flex flex-row justify-center items-center'>
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-2 mx-auto'>
                        <div className='my-2'>
                            <label className='text-xl mr-4 text-white' htmlFor="userType">Select User</label>
                            <select
                                value={userType}
                                onChange={(e) => {
                                    setUserType(e.target.value)
                                }}
                                className='border-2 border-gray-500 p-1 w-1/3' name="userType" id="userType">

                                {userArray.map((user, i) => <option key={i} value={user}>{user}</option>)}
                            </select>
                        </div>
                        <div className='my-2'>
                            <label className='text-xl mr-4 text-white'>Name</label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='border-2 border-gray-500 p-1 w-full'
                            />
                        </div>
                        <div className='my-2'>
                            <label className='text-xl mr-4 text-white'>Email</label>
                            <input
                                type='text'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='border-2 border-gray-500 p-1 w-full'
                            />
                        </div>
                        <div className='my-2'>
                            <label className='text-xl mr-4 text-white'>Password</label>
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='border-2 border-gray-500 p-1 w-full'
                            />
                        </div>
                        <button className='p-2 bg-sky-300 m-2 w-1/2 self-center' onClick={handleSaveUser}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateUser