import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { MdOutlineClose } from "react-icons/md"
import { MyContext } from '../MyContext';
import { useSnackbar } from 'notistack';

const EditStudent = ({ onClose, indexid }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [classroom, setClassroom] = useState('');
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('')
    const { users, setUsers, token, classrooms } = useContext(MyContext)

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {

        axios.get(`http://localhost:4000/api/principal/${indexid}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((response) => {
                setUserType(response.data.userType)
                setName(response.data.name);
                setEmail(response.data.email)
                setPassword(response.data.password)
                setClassroom(response.data.classroom)


            }).catch((error) => {

                alert('An error happend, Please check console');
                console.log(error)
            })
    }, [])

    const handleEditStudent = () => {

        const data = {
            userType,
            name,
            email,
            password,
            classroom
        };

        console.log(data)
        axios.put(`http://localhost:4000/api/principal/${indexid}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((res) => {
                const update = users.map((item) => {
                    if (item._id === indexid) {
                        return { ...data };
                    }
                    return item
                })
                setUsers(update)
                console.log(res)
                onClose()
                enqueueSnackbar('Details Updated Successfully', { variant: 'success' });
            }).catch((error) => {
                console.log(error)
                enqueueSnackbar('Failed to Update Details, check user already exist or not', { variant: 'error' });
            })
    }

    return (
        <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex flex-col justify-center items-center">
            <div className="bg-gray-800 flex flex-col rounded-md p-2 relative w-1/2" onClick={(e) => { e.stopPropagation() }}>
                <MdOutlineClose className='text-white m-1 cursor-pointer absolute top-4 right-4' title="close" size={30} onClick={onClose} />
                <h2 className='text-2xl text-white m-2 text-center'>Edit Student Details</h2>

                <div className='flex flex-row justify-center items-center'>
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-2 mx-auto'>

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
                                type='text'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='border-2 border-gray-500 p-1 w-full'
                            />
                        </div>
                        <div className='my-2'>
                            <label className='text-xl mr-4 text-white' htmlFor="teacher">Allot Class to Student</label>
                            <select
                                value={classroom}
                                onChange={(e) => setClassroom(e.target.value)}
                                className='border-2 border-gray-500 p-1 w-1/3' name="classroom" id="classroom">
                                <option>Select Class</option>
                                {classrooms.map((na, i) => <option key={i} value={na._id}>{na.name}</option>)}
                            </select>
                        </div>
                        <button className='p-2 bg-sky-300 m-2 w-1/2 self-center' onClick={handleEditStudent}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditStudent
