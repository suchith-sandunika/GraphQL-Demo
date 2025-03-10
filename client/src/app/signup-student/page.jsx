'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { STUDENT_REGISTRATION } from '@/config/student/authQuery';
import useJoinName from '@/hooks/useJoinName';
import UpdateSubjectMarks from '../update-subject-marks/page';
import 'react-toastify/dist/ReactToastify.css';

const StudentSignUp = () => {
    const [id, setId] = useState('');
    const [isSignup, setIsSignup] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(19);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignupSuccessfull, setIsSignupSuccessfull] = useState(false);

    const router = useRouter();

    const [studentRegister] = useMutation(STUDENT_REGISTRATION);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if(firstName == '' || lastName == '' || email == '' || age == '' || password == '' || confirmPassword == '') {
            toast.error('Please enter all the details');
            return;
        } 

        if(password != confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        
        if(parseInt(age) <= 18) {
            toast.error('Age must be above 18');
            return;
        }

        if(password.length < 5 || password.length >= 10) {
            toast.error('Password Length must be between 5 and 10 characters');
            return;
        }

        console.log("Sending request with:", { firstName, lastName, email, age, password });

        try {
            const { data } = await studentRegister({
                variables: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    age: parseInt(age),
                    password: password
                }
            });

            console.log(data.studentRegister.id);

            if(data?.studentRegister?.id) {
                const studentId = data.studentRegister.id;
                setId(studentId);
                toast.success('Sign Up Successful');
                setIsSignup(false);
                setIsSignupSuccessfull(true);
                // router.push('/update-subject-marks');
                router.push(`/update-subject-marks/${useJoinName(data.studentRegister.firstName, data.studentRegister.lastName)}`);
            } else {
                toast.error('Sign Up Failed');
                return; 
            }
        } catch (error) {
            toast.error('An error occurred while Signing Up');
            console.error(error);
            return;
        }
    }
    return (
        <div className="h-screen flex items-center justify-center">
            { isSignup ? (
                <div className="w-100 rounded-lg shadow-lg border border-gray-200 p-6 bg-white">
                    <h1 className="text-2xl font-bold text-center">Student Sign Up</h1>
                    <form onSubmit={handleSignUp}>
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
                            <label className="block text-gray-700 text-sm font-bold mb-2">Age ( In Years )</label>
                            <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)}/>
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
                            <button className="mt-3 flex items-center justify-center bg-blue-500 px-4 py-2 text-white hover:bg-blue-400 rounded-sm cursor-pointer" type="submit">
                                Sign Up
                            </button>
                        </div>
                        <p className='mt-2 text-center items-center'>Already have an account? <a href='/login-student' className='text-blue-400'>Login</a></p>
                    </form>
                </div>
            ) : null }
            <ToastContainer />
            {/* { isSignupSuccessfull && id && !isSignup && (<UpdateSubjectMarks data={id} />) } */}
        </div>
    );
}

export default StudentSignUp;
