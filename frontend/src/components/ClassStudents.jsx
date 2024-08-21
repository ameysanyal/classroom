
// The issue where the table isn't loading after a page refresh but works on the first load could be due 
// to the fact that the teachers state or context isn't immediately available when the ClassStudents component mounts. 
// This can cause the teacher variable to be undefined, resulting in an empty classStudents array.
// You can modify the useEffect hook to wait until teachers is populated before trying to find the teacher and set the students

import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../MyContext";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import EditStudent from "./EditStudent";
import axios from "axios";
import { useSnackbar } from 'notistack';

const ClassStudents = ({ userName, loggedIn }) => {
    const [edit, setEdit] = useState(false);
    const [indexid, setIndexId] = useState();

    const { backendUrl, classStudents, setClassStudents, teachers, users, setUsers, token, setStudents } = useContext(MyContext);
    const { enqueueSnackbar } = useSnackbar();

    const updateClassStudents = async () => {
        if (teachers.length > 0 && userName) {
            const currentUser = teachers.find(t => t.name === userName);

            if (currentUser && currentUser.classroom && currentUser.classroom.students) {
                setClassStudents(currentUser.classroom.students);
            }
        }

        if (loggedIn && loggedIn.classroom && loggedIn.classroom._id) {
            try {
                const response = await axios.get(`${backendUrl}/api/classroom/${loggedIn.classroom._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setClassStudents(response.data.students);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        }
    };

    useEffect(() => {
        updateClassStudents();
    }, [teachers, userName]);

    useEffect(() => {
        axios.get(`${backendUrl}/api/principal`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((res) => {
                const onlyStudents = res.data.data.filter(
                    (item) => item.userType === "Student"
                );
                setStudents(onlyStudents);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [token]);

    const handleDeleteUser = (id) => {
        axios.delete(`${backendUrl}/api/principal/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(() => {
                setUsers(users.filter((item) => item.id !== id));
                enqueueSnackbar('User Deleted Successfully', { variant: 'success' });


                setClassStudents(prevStudents => prevStudents.filter(student => student._id !== id));
            })
            .catch((error) => {
                enqueueSnackbar('Failed to Delete User', { variant: 'error' });
                console.log(error);
            });
    };

    return (
        <>
            <h1 className="font-bold text-2xl text-center">Your Class Students</h1>
            {classStudents.length > 0 ? (
                <div className="overflow-y-auto h-128">
                    <table className="w-full border-separate border-spacing-2 p-6">
                        <thead>
                            <tr>
                                <th className="border border-slate-600 rounded-md">No</th>
                                <th className="border border-slate-600 rounded-md">Name</th>
                                <th className="border border-slate-600 rounded-md">Email</th>
                                <th className="border border-slate-600 rounded-md">Password</th>
                                <th className="border border-slate-600 rounded-md">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classStudents.map((student, index) => (
                                <tr key={student._id} className="h-8">
                                    <td className="border border-slate-700 rounded-md text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border border-slate-700 rounded-md text-center">
                                        {student.name}
                                    </td>
                                    <td className="border border-slate-700 rounded-md text-center">
                                        {student.email}
                                    </td>
                                    <td className="border border-slate-700 rounded-md text-center break-all">
                                        {student.password}
                                    </td>
                                    <td className="border border-slate-700 rounded-md text-center">
                                        <div className="flex justify-center gap-x-4">
                                            <AiOutlineEdit
                                                title="edit"
                                                className="cursor-pointer text-2xl text-yellow-800"
                                                onClick={() => {
                                                    setEdit(true);
                                                    setIndexId(student._id);
                                                }}
                                            />
                                            <MdOutlineDelete
                                                title="delete"
                                                className="cursor-pointer text-2xl text-red-800"
                                                onClick={() => {
                                                    handleDeleteUser(student._id);
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>Loading...</div>
            )}

            {edit && <EditStudent indexid={indexid} onClose={() => setEdit(false)} />}
        </>
    );
};

export default ClassStudents;
