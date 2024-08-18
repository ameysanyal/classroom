import React from 'react'


const ClassDetails = ({ loggedIn }) => {

    return (
        <div className='flex flex-col items-center p-4'>

            <h1 className='text-2xl my-4 font-bold'>Your Class Details</h1>

            {loggedIn ? (<div className='flex flex-col border-2 border-sky-400 rounded-xl w-1/2 p-4'>

                <div className='my-2'>
                    <span className='text-xl mr-4 text-gray-800'>Class Name:</span>
                    <span className='text-xl'>{loggedIn && loggedIn.classroom.name}</span>
                </div>
                <div className='my-2'>
                    <span className='text-xl mr-4 text-gray-800'>Class Days:</span>
                    <span className='text-xl'>{loggedIn && loggedIn.classroom.schedule[0].startDay} to {loggedIn && loggedIn.classroom.schedule[0].endDay}</span>
                </div>
                <div className='my-2'>
                    <span className='text-xl mr-4 text-gray-800'>Class Timing:</span>

                    <span className='text-xl'>{loggedIn && loggedIn.classroom.schedule[0].startTime} to {loggedIn && loggedIn.classroom.schedule[0].endTime}</span>
                </div>
                <div className='my-2'>
                    <span className='text-xl mr-4 text-gray-800'>Created At:</span>
                    <span className='text-xl'>{new Date(loggedIn.classroom.createdAt).toString()}</span>
                </div>
                <div className='my-2'>
                    <span className='text-xl mr-4 text-gray-800'>Updated At:</span>
                    <span className='text-xl'>{new Date(loggedIn.classroom.updatedAt).toString()}</span>
                </div>

            </div>
            ) : (
                <div>Loading...</div>
            )}

        </div>
    )
}

export default ClassDetails
