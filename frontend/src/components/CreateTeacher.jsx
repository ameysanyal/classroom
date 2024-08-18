import React, { useState, useContext } from 'react'
import axios from 'axios'
import { MyContext } from '../MyContext'
import { useSnackbar } from 'notistack'

const CreateTeacher = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { backendUrl, users, setUsers, token, teachers, setTeachers } = useContext(MyContext)
    const { enqueueSnackbar } = useSnackbar();


    const handleSaveUser = async () => {
        const data = {
            userType: "Teacher",
            name,
            email,
            password,
        };
        console.table(data);

        try {

            const response = await axios.post(`${backendUrl}/api/principal`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log(response);
            const updated = [...users, response.data];
            setUsers(updated);
            const updatedTeachers = [...teachers, response.data]
            setTeachers(updatedTeachers)
            setName('')
            setEmail('')
            setPassword('')
            enqueueSnackbar('Teacher Created Successfully', { variant: 'success' });

        } catch (error) {
            console.error(error);
            enqueueSnackbar('Failed to create teacher, check user already exist or not', { variant: 'error' });
        }
    };

    return (
        <div className='flex justify-center m-10'>
            <div className='flex flex-row justify-center items-center'>
                <div className='flex flex-col border-2 border-gray-800  rounded-xl w-[600px] p-2 mx-auto'>

                    <div className='my-2'>
                        <label className='text-xl mr-4'>Name</label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border-2 border-gray-500 p-1 w-full'
                        />
                    </div>
                    <div className='my-2'>
                        <label className='text-xl mr-4'>Email</label>
                        <input
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border-2 border-gray-500 p-1 w-full'
                        />
                    </div>
                    <div className='my-2'>
                        <label className='text-xl mr-4'>Password</label>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border-2 border-gray-500 p-1 w-full'

                        />

                    </div>
                    <button className='p-2 bg-gray-800 m-2 w-1/4 self-center text-white font-bold' onClick={handleSaveUser}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateTeacher
