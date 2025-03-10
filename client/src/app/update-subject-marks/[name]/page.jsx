'use client';
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter, useParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { UPDATE_STUDENT_MARKS } from '@/config/updateQuery';
import { STUDENT_DATA_BY_NAME } from '@/config/getQuery';
import useDevideName from '@/hooks/useDevideName';
import 'react-toastify/dist/ReactToastify.css';

const UpdateSubjectMarks = () => {
    const [studentId, setStudentId] = useState('');
    const [sinhalaMark, setSinhalaMark] = useState(0);
    const [englishMark, setEnglishMark] = useState(0);
    const [mathsMark, setMathsMark] = useState(0);
    const [scienceMark, setScienceMark] = useState(0);
    const [religionMark, setReligionMark] = useState(0);
    const [historyMark, setHistoryMark] = useState(0);
    const [op1Mark, setOP1Mark] = useState(0);
    const [op2Mark, setOP2Mark] = useState(0);
    const [op3Mark, setOP3Mark] = useState(0);

    const { name } = useParams();
    const router = useRouter();

    const arr = useDevideName(name);
    const firstName = arr[0];
    const lastName = arr[1];

    const { data, loading, error } = useQuery(STUDENT_DATA_BY_NAME, {
        variables: {
            firstName: firstName,
            lastName: lastName
        }
    });
    const [updateStudentSubjectMarks] = useMutation(UPDATE_STUDENT_MARKS);

    useEffect(() => {
        if(name) {
            if(data?.studentByName) {
                console.log(data.studentByName);
                const id = data.studentByName.id;
                console.log('id: ' + id);
                setStudentId(id);
                console.log('Student Id:', studentId);
            } else {
                return;
            }
        }
    }, [data, loading, error, name, studentId]);

    const handleUpdateMarks = async (e) => {
        e.preventDefault();

        console.log('Update Marks Button Clicked');
        console.log("Id", studentId);
        console.log(scienceMark, englishMark, mathsMark, sinhalaMark, religionMark, historyMark, op1Mark, op2Mark, op3Mark);

        if(name) {
            // Confirmation ...
            Swal.fire({
                title: 'Confirmation About Update',
                text: 'Are you sure you want to update Student Marks?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Update'
            }).then(async (result) => {
                if(result.isConfirmed) {
                    try {
                        const { data } = await updateStudentSubjectMarks({
                            variables: {
                                id: studentId,
                                SinhalaSubjectMark: parseInt(sinhalaMark),
                                ReligionSubjectMark: parseInt(religionMark),
                                ScienceSubjectMark: parseInt(scienceMark),
                                MathsSubjectMark: parseInt(mathsMark),
                                EnglishSubjectMark: parseInt(englishMark),
                                HistorySubjectMark: parseInt(historyMark),
                                OP1SubjectMark: parseInt(op1Mark),
                                OP2SubjectMark: parseInt(op2Mark),
                                OP3SubjectMark: parseInt(op3Mark)
                            }
                        });

                        console.log('ID--', data.updateStudentMarks.id);

                        if(data?.updateStudentMarks?.id) {
                            toast.success('Student Marks Updated Successfully');
                            router.push('/profile-student');
                        } else {
                            toast.error('Error Updating Student Marks');
                            return;
                        }
                    } catch (error) {
                        toast.error(error.message);
                        return;
                    }
                }
            });
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-100 rounded-lg shadow-lg border border-gray-200 p-6 bg-white">
                <h1 className="mt-15 text-xl font-bold text-center">Student Last Term Marks Update</h1>
                <form>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Sinhala</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" placeholder="Enter Mark" value={sinhalaMark} onChange={(e) => setSinhalaMark(e.target.value)}/>
                    </div>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">English</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" placeholder="Enter Mark" value={englishMark} onChange={(e) => setEnglishMark(e.target.value)}/>
                    </div>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Maths</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" placeholder="Enter Mark" value={mathsMark} onChange={(e) => setMathsMark(e.target.value)}/>
                    </div>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Science</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" placeholder="Enter Mark" value={scienceMark} onChange={(e) => setScienceMark(e.target.value)}/>
                    </div>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Religion</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" placeholder="Enter Mark" value={religionMark} onChange={(e) => setReligionMark(e.target.value)}/>
                    </div>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">History</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" placeholder="Enter Mark" value={historyMark} onChange={(e) => setHistoryMark(e.target.value)}/>
                    </div>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Optional Subject 01</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" placeholder="Enter Mark" value={op1Mark} onChange={(e) => setOP1Mark(e.target.value)}/>
                    </div>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Optional Subject 02</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" placeholder="Enter Mark" value={op2Mark} onChange={(e) => setOP2Mark(e.target.value)}/>
                    </div>
                    <div className='pt-2 items-center justify-center'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Optional Subject 03</label>
                        <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" placeholder="Enter Mark" value={op3Mark} onChange={(e) => setOP3Mark(e.target.value)}/>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="mt-3 flex items-center justify-center bg-blue-500 px-4 py-2 text-white hover:bg-blue-400 rounded-sm cursor-pointer" type="submit" onClick={handleUpdateMarks}>
                            Update Marks
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default UpdateSubjectMarks;
