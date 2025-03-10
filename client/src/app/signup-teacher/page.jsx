'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherSignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        if(firstName == '' || lastName == '' || email == '' || password == '' || confirmPassword == '') {
            toast.error('Please enter all the details');
            return;
        } 

        if(password != confirmPassword) {
            toast.error('Passwords do not match');
            return;
        } 

        console.log('Firstname:', firstName);
        console.log('Lastname:', lastName);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-100 rounded-lg shadow-lg border border-gray-200 p-6 bg-white">
                <h1 className="text-2xl font-bold text-center">Teacher Sign Up</h1>
                <form>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="text" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="text" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">confirm Password</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="mt-3 flex items-center justify-center bg-blue-500 px-4 py-2 text-white hover:bg-blue-400 rounded-sm cursor-pointer" type="submit" onClick={handleSignUp}>
                            Sign Up
                        </button>
                    </div>
                    <p className='mt-2 text-center items-center'>Already have an account? <a href='/login-teacher' className='text-blue-400'>Login</a></p>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default TeacherSignUp;
