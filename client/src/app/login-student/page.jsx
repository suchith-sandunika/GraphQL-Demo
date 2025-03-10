'use client';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { STUDENT_LOGIN } from '@/config/authQuery';
import 'react-toastify/dist/ReactToastify.css'; 

const StudentLogin = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isClient, setIsClient] = useState(false);

    const router = useRouter();

    // ✅ Apollo GraphQL Mutation Hook ...
    const [loginStudent] = useMutation(STUDENT_LOGIN);

    const handleLogin = async (e) => {
        e.preventDefault(); // ✅ Prevent page reload ...

        if(userName === '' || password === '') { 
            toast.error('Please enter username and password');
            return;
        } 

        console.log("Sending request with:", { userName, password });

        try {
            const { data } = await loginStudent({ 
                variables: userName.includes("@") ? { email: userName, password: password } : { firstName: userName, password: password }
            });

            if(data?.studentLogin?.id) {
                console.log(data);
                toast.success('Logged in successfully');
                const name = data.studentLogin.firstName.concat(" ");
                const fullName = name.concat(data.studentLogin.lastName);
                router.push(`/profile-student/${fullName}`);
            } else {
                toast.error('Incorrect username or password');
                console.log('Error');
            }
        } catch (error) {
            toast.error('An error occurred while logging in');
            console.error(error);
            return;
        }
    }

    useEffect(() => {
        // Run the query only on the client-side
        if (typeof window !== "undefined") {
          // Your GraphQL Query
          setIsClient(true);
        }
    }, []);

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-100 rounded-lg shadow-lg border border-gray-200 p-6 bg-white">
                <h1 className="text-2xl font-bold text-center">Student Login</h1>
                {/* ✅ Submit handled by form ... */}
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
                    <p className='mt-2 text-center items-center'>Don't have an account? <a href='/signup-student' className='text-blue-400'>Sign Up</a></p>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default StudentLogin;
