"use client";
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Image from 'next/image';
import useJoinName from '@/hooks/useJoinName';
import LOGOUT from '@/config/common/authQuery';
import { GET_STUDENTS } from '@/config/student/getQuery';
import userImg from '@/assets/user.png';

const Students = () => {
    const { data, loading, error } = useQuery(GET_STUDENTS);
    const [logout] = useMutation(LOGOUT);
    const [students, setStudents] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if(data?.students) {
            console.log(data.students);
            setStudents(data.students);
            console.log('Students', students);
        } else if (!loading && error) {
            toast.error('Error fetching student data');
            return;
        } else {
            return;
        }
    }, [data, loading, error]);

    const viewStudentDetails = (name) => {
        router.push(`/profile-student/${name}`);
    }

    const logoutSystem = () => {
        Swal.fire({
                    title: 'Confirmation About logout',
                    text: 'Are you sure you want to logout?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Update'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await logout();
                if(data?.logout?.id) {
                    toast.success('Logged out successfully');
                    router.push('/login-student');
                }
            }
        });
    }

    return (
        <div className='w-screen h-screen'>
        <div className='bg-white'>
            <ToastContainer />
            <div className="grid grid-cols-3 items-center px-4 mt-5">
                <div></div>
                <h1 className='text-center mt-5 text-3xl font-bold'> Students </h1>
                <button className='bg-amber-700 text-white hover:bg-amber-700 rounded-md py-2 px-2 justify-self-end cursor-pointer' onClick={logoutSystem}>Logout</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {students.map((student) => (
                    <div key={student.id} className='w-135 rounded-lg shadow-lg border border-gray-200 p-6 bg-white ml-2 mr-2 mt-5'>
                        <div className='flex items-center space-x-4'>
                            <div className='ml-4 mr-2'>
                                <img src='https://www.citypng.com/public/uploads/preview/white-user-member-guest-icon-png-image-701751695037005zdurfaim0y.png' alt='student-image' width={100} height={100} className="rounded-full"/>
                            </div>
                            <div className='text-xl ml-4'>
                                <p className='font-bold'> Student Name: {useJoinName(student.firstName, student.lastName)}</p>
                                <p className='font-bold'> Student ID: {student.id}</p>
                                <p className='font-bold'> Student Email: {student.email}</p>
                                <p className='font-bold'> Student Age: {student.age}</p>
                            </div>
                        </div>
                        <div className='items-center flex justify-center mt-3'>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={() => viewStudentDetails(useJoinName(student.firstName, student.lastName))}>View Student Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default Students;
