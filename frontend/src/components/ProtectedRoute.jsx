
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MyContext } from '../MyContext';

const ProtectedRoute = ({ children, allowedUserType }) => {
    const { token, users } = useContext(MyContext);

    const userId = localStorage.getItem('userId');

    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Check if users are loaded
    if (!users || users.length === 0) {

        return <div className='h-screen flex items-center justify-center text-3xl'>Loading...</div>; // or a loading indicator
    }
    const user = users.find((u) => u._id === userId);

    if (!user || allowedUserType !== user.userType) {

        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;


