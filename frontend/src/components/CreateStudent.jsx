import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MyContext } from '../MyContext';
import { useSnackbar } from 'notistack';
import ClassStudents from './ClassStudents';

const CreateStudent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [classroom, setClassroom] = useState('');
    const { users, setUsers, token, classrooms } = useContext(MyContext);
    const { enqueueSnackbar } = useSnackbar();

    const handleSaveUser = async () => {
        // Ensure classroom is selected
        if (!classroom || classroom === "Select Class") {
            enqueueSnackbar('Please select a class.', { variant: 'warning' });
            return;
        }

        const data = {
            userType: "Student",
            name,
            email,
            password,
            classroom,
        };
        console.table(data);

        try {
            const response = await axios.post('http://localhost:4000/api/principal', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });



            // Patch the classroom with the new student ID
            try {
                await axios.patch(`http://localhost:4000/api/classroom/${classroom}`, { studentId: response.data.userId }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Student added to classroom');
            } catch (patchError) {
                console.error('Failed to add student to classroom:', patchError);
                enqueueSnackbar('Failed to add student to classroom', { variant: 'error' });
                return; // Exit to prevent adding the user to the list in case of failure
            }

            // Update the local state with the new user

            // console.log(JSON.stringify(response.data))

            const updatedUsers = [...users, response.data];
            setUsers(updatedUsers);



            setName('');
            setEmail('');
            setPassword('');
            setClassroom('Select Class');

            enqueueSnackbar('Student Created Successfully', { variant: 'success' });

        } catch (error) {
            console.error('Failed to create student:', error);
            enqueueSnackbar('Failed to create Student, check user already exist or not', { variant: 'error' });
        }
    };

    return (
        <div className='flex justify-center m-10'>
            <div className='flex flex-row justify-center items-center'>
                <div className='flex flex-col border-2 border-gray-800 rounded-xl w-[600px] p-2 mx-auto'>

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
                    <div className='my-2'>
                        <label className='text-xl mr-4' htmlFor="teacher">Allot Class to Student</label>
                        <select
                            value={classroom}
                            onChange={(e) => setClassroom(e.target.value)}
                            className='border-2 border-gray-500 p-1 w-1/3' name="classroom" id="classroom">
                            <option>Select Class</option>
                            {classrooms.map((na, i) => <option key={i} value={na._id}>{na.name}</option>)}
                        </select>
                    </div>
                    <button className='p-2 bg-gray-800 m-2 w-1/4 self-center text-white font-bold' onClick={handleSaveUser}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateStudent;
