import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../MyContext";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import EditStudent from "./EditStudent";
import axios from "axios";
import { useSnackbar } from 'notistack'

const StudentTable = () => {
    const [edit, setEdit] = useState(false);
    const [indexid, setIndexId] = useState();
    const { users, setUsers, token, students, setStudents } = useContext(MyContext);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/principal", {
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
    }, [users]);

    const handleDeleteUser = (id) => {
        axios
            .delete(`http://localhost:4000/api/principal/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((res) => {
                const newUsers = users.filter((item) => item.id !== id)
                setUsers(newUsers)
                enqueueSnackbar('Teacher Deleted Successfully', { variant: 'success' });

            })
            .catch((error) => {
                enqueueSnackbar('Failed to Delete teacher', { variant: 'error' });
                console.log(error)
            });
    };

    return (
        <>
            <div className="overflow-y-auto h-128">
                <table className="w-full border-separate border-spacing-2 p-6">
                    <thead>
                        <tr>
                            <th className="border border-slate-600 rounded-md">No</th>
                            <th className="border border-slate-600 rounded-md">
                                Name
                            </th>
                            <th className="border border-slate-600 rounded-md">
                                Class
                            </th>
                            <th className="border border-slate-600 rounded-md">Email</th>
                            <th className="border border-slate-600 rounded-md">Password</th>
                            <th className="border border-slate-600 rounded-md">Operations</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student._id} className="h-8">
                                <td className="border border-slate-700 rounded-md text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {student.name}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {student.classroom ? student.classroom.name : 'None'}
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
            {edit && <EditStudent indexid={indexid} onClose={() => setEdit(false)} />}
        </>
    );
};

export default StudentTable;
