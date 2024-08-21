import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../MyContext";

const ClassMates = ({ userName }) => {
    const [classStudents, setClassStudents] = useState([]);
    const { students } = useContext(MyContext);

    useEffect(() => {
        console.log(`students state:`, students);

        if (students.length > 0 && userName) {
            const currentUser = students.find(t => t.name === userName);
            console.log(`currentUser:`, currentUser);

            if (currentUser && currentUser.classroom && currentUser.classroom.students) {
                const filteredStudents = currentUser.classroom.students.filter(student => student.name !== userName);
                setClassStudents(filteredStudents);
            }
        }


    }, [userName, students]);

    return (
        <>
            <h1 className="font-bold text-2xl text-center">Your ClassMates</h1>
            {classStudents.length > 0 ? (
                <div className="overflow-y-auto h-128">
                    <table className="w-full border-separate border-spacing-2 p-6">
                        <thead>
                            <tr>
                                <th className="border border-slate-600 rounded-md">No</th>
                                <th className="border border-slate-600 rounded-md">Name</th>
                                <th className="border border-slate-600 rounded-md">Email</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default ClassMates;
