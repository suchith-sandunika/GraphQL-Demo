'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { TEACHER_LOGIN } from '@/config/teacher/authQuery';
import 'react-toastify/dist/ReactToastify.css';

const TeacherLogin = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const [teacherLogin] = useMutation(TEACHER_LOGIN);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if(userName == '' || password == '') {
            toast.error('Please enter username and password');
            return;
        } 

        try {
            const { data } = await teacherLogin({
                variables: userName.includes("@") ? { email: userName, password: password } : { firstName: userName, password: password }
            });

            if(data?.teacherLogin?.id) {
                toast.success('Login Successful');
                router.push('profile-student');
            } else {
                toast.error('Incorrect username or password');
                return;
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
            return;
        }
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-100 rounded-lg shadow-lg border border-gray-200 p-6 bg-white">
                <h1 className="text-2xl font-bold text-center">Teacher Login</h1>
                <form onSubmit={handleLogin}>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="text" placeholder="Enter Username Or Email" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    </div>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="mt-3 flex items-center justify-center bg-blue-500 px-4 py-2 text-white hover:bg-blue-400 rounded-sm cursor-pointer" type="submit">
                            Login
                        </button>
                    </div>
                    <p className='mt-2 text-center items-center'>Don't have an account? <a href='/signup-teacher' className='text-blue-400'>Sign Up</a></p>
                    <p className='mt-2 text-center items-center'><a href='/login-student' className='text-blue-400'>Go Back</a></p>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default TeacherLogin;
