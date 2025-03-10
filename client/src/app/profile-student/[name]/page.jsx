'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import Swal from 'sweetalert2';
import useSwicth from '@/hooks/useSwitch';
import { STUDENT_DATA_BY_NAME } from '@/config/student/getQuery';
import { UPDATE_STUDENT_MARKS, UPDATE_STUDENT_DATA } from '@/config/common/updateQuery';
import DELETE_STUDENT from '@/config/common/deleteQuery';
import 'react-toastify/dist/ReactToastify.css';
import useDevideName from '@/hooks/useDevideName';

const StudentProfile = () => {
    const { name } = useParams();
    const router = useRouter();
    const arr = useDevideName(name);

    const [loadData, setLoadData] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [updateButtonClicked, setUpdateButtonClicked] = useState(false);
    const [updateMarks, setUpdateMarks] = useState(false);

    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);

    const [sinhalaMark, setSinhalaMark] = useState(0);
    const [englishMark, setEnglishMark] = useState(0);
    const [mathsMark, setMathsMark] = useState(0);
    const [scienceMark, setScienceMark] = useState(0);
    const [religionMark, setReligionMark] = useState(0);
    const [historyMark, setHistoryMark] = useState(0);
    const [op1Mark, setOP1Mark] = useState(0);
    const [op2Mark, setOP2Mark] = useState(0);
    const [op3Mark, setOP3Mark] = useState(0);

    const { data, loading, error } = useQuery(STUDENT_DATA_BY_NAME, {
        variables: { 
            firstName: arr[0], 
            lastName: arr[1] 
        },
        skip: !name, // Ensure valid input ...
    }); 

    const [updateStudentMarks] = useMutation(UPDATE_STUDENT_MARKS);
    const [updateStudentData] = useMutation(UPDATE_STUDENT_DATA);
    const [deleteStudentData] = useMutation(DELETE_STUDENT);

    useEffect(() => {
        if(data?.studentByName) {
            setId(data?.studentByName.id);
            setFirstName(data?.studentByName.firstName);
            setLastName(data?.studentByName.lastName);
            setEmail(data?.studentByName.email);
            setAge(data?.studentByName.age);
            setSinhalaMark(data?.studentByName.SinhalaSubjectMark);
            setReligionMark(data?.studentByName.ReligionSubjectMark);
            setScienceMark(data?.studentByName.ScienceSubjectMark);
            setEnglishMark(data?.studentByName.EnglishSubjectMark);
            setMathsMark(data?.studentByName.MathsSubjectMark);
            setHistoryMark(data?.studentByName.HistorySubjectMark);
            setOP1Mark(data?.studentByName.OP1SubjectMark);
            setOP2Mark(data?.studentByName.OP2SubjectMark);
            setOP3Mark(data?.studentByName.OP3SubjectMark);
        } else if (!loading && error) {
            toast.error('Error fetching student data');
            return;
        } else {
            return;
        }
    }, [data, loading, error]);

    const handleFileChange = (event) => { 
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoadData(false);
        setUpdateButtonClicked(true);
    } 

    const handleConfirmUpdate = async (e) => {
        e.preventDefault();
        setUpdateButtonClicked(false);

        if(firstName == '' || lastName == '' || email == '' || age == '') {
            toast.error('Please fill all the details');
            return;
        }

        Swal.fire({
            title: 'Confirmation About Update',
            text: 'Are you sure you want to update this Student Details?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update'
        }).then(async (result) => {
            if(result.isConfirmed) {
                try {
                    const { data } = await updateStudentData({
                        variables: {
                            id: id,
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            age: parseInt(age)
                        }
                    });
        
                    if(data?.updateStudentDetails?.id) {
                        toast.success('Student Details Updated Successfully');
                        setUpdateButtonClicked(false);
                        setLoadData(true);
                    } else {
                        toast.error('Error Updating Student Details');
                        return;
                    }
                } catch (error) {
                    toast.error(error.message);
                    return;
                } 
            }
        });
    }

    const handleCancelUpdate = (e) => {
        e.preventDefault();
        setUpdateButtonClicked(false);
        setUpdateMarks(false);
        setLoadData(true);
    }

    const handleUpdateMarks = async (e) => {
        e.preventDefault();
        setLoadData(false);
        setUpdateMarks(true);
    }

    const handleCancelUpdateMarks = (e) => {
        e.preventDefault();
        setUpdateMarks(false);
        setLoadData(true);
    } 

    const handleUpdateStudentMarks = async (e) => {
        e.preventDefault();
        setLoadData(false);
        setUpdateMarks(true); 

        Swal.fire({
            title: 'Confirmation About Update',
            text: 'Are you sure you want to update this Student Details?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update'
        }).then(async (result) => {
            if(result.isConfirmed) {
                try {
                    const { data } = await updateStudentMarks({
                        variables: {
                            id: id,
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
                    }) 
        
                    console.log(data.updateStudentMarks.id);
        
                    if(data?.updateStudentMarks?.id) {
                        toast.success('Marks Updated Successfully');
                        setLoadData(true);
                        setUpdateMarks(false);
                    } else {
                        toast.error('Error Updating Marks');
                        return;
                    }
                } catch (error) {
                    toast.error(error);
                    return;
                }
            }
        });
    } 

    const handleDeleteStudentData = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Confirmation About Delete',
            text: 'Are you sure you want to Delete this Student Details?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#be1616',
            cancelButtonColor: '#e0d315',
            confirmButtonText: 'Delete Student Data'
        }).then(async (result) => {
            if(result.isConfirmed) {
                try {
                    const data = await deleteStudentData({
                        variables: {
                            id: id
                        } 
                    });

                    if(data?.deleteStudent?.id) {
                        // toast.success('Student Data Deleted Successfully');
                        router.push('/profile-student');
                    } else {
                        toast.error('Error Deleting Student Data');
                        return;
                    }
                } catch (error) {
                    toast.error(error);
                    return;
                }
            }
        });
    } 

    const moveBack = () => {
        router.push('/profile-student');
    }

    return (
        <div className="h-screen flex items-center justify-center p-4 bg-gray-100">
            <ToastContainer/>
            { loadData ? (
                <div className="min-h-100 w-200 rounded-lg shadow-lg border border-gray-200 p-6 bg-white">
                    <h1 className="text-2xl font-bold text-center">Student Profile - {useSwicth(name)} </h1>
                    <div className='mt-2 text-center'>
                        <p className='mb-1'>Student First Name: {firstName}</p>
                        <p className='mb-1'>Student Last Name: {lastName}</p>
                        <p className='mb-1'>Student Email: {email}</p>
                        <p className='mb-1'>Student Age: {age}</p>
                        <div className='mt-2'>
                            <h1 className='mb-1 text-2xl font-bold text-center'>Student Last Term Marks - {useSwicth(name)}</h1>
                            <p className='mb-1'>Sinhala: {sinhalaMark}</p>
                            <p className='mb-1'>Maths: {mathsMark}</p>
                            <p className='mb-1'>English: {englishMark}</p>
                            <p className='mb-1'>Science: {scienceMark}</p>
                            <p className='mb-1'>Religion: {religionMark}</p>
                            <p className='mb-1'>History: {historyMark}</p>
                            <p className='mb-1'>Optional Subject 01: {op1Mark}</p>
                            <p className='mb-1'>Optional Subject 02: {op2Mark}</p>
                            <p className='mb-1'>Optional Subject 03: {op3Mark}</p>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <button className="mt-3 flex items-center justify-center bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-400 rounded-sm cursor-pointer" type="submit" onClick={handleUpdate}>
                                Update Student Data
                            </button>
                            <button className="mt-3 flex items-center justify-center bg-green-500 px-4 py-2 text-white hover:bg-green-400 rounded-sm cursor-pointer" type="submit" onClick={handleUpdateMarks}>
                                Update Student Marks
                            </button>
                            <button className="mt-3 flex items-center justify-center bg-red-500 px-4 py-2 text-white hover:bg-red-400 rounded-sm cursor-pointer" type="submit" onClick={handleDeleteStudentData}>
                                Delete Student Data
                            </button>
                            <button className="mt-3 flex items-center justify-center bg-orange-500 px-4 py-2 text-white hover:bg-orange-400 rounded-sm cursor-pointer" type="submit" onClick={moveBack}>
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            ) : null }

            { updateButtonClicked ? (
                <div className="min-h-100 w-200 rounded-lg shadow-lg border border-gray-200 p-6 bg-white">
                    <h1 className="text-2xl font-bold text-center">Update Student Profile Data - {useSwicth(name)} </h1>
                    <form>
                        {/* <div className='pt-2 items-center justify-center'>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Student Image</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" type="file"  accept="image/*"  onChange={handleFileChange}/>
                            {selectedFile && (
                                <div className="flex justify-center">
                                    <img src={selectedFile} alt="Preview" className="mt-2 w-20 h-20 rounded-md items-center object-cover"/>
                                </div>
                            )}
                        </div> */}
                        <div className='pt-2 items-center justify-center'>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Student First Name</label>
                            <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="text" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        <div className='pt-2 items-center justify-center'>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Student Last Name</label>
                            <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="text" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                        <div className='pt-2 items-center justify-center'>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Student Email</label>
                            <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className='pt-2 items-center justify-center'>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Student Age(In Years)</label>
                            <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)}/>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <button className="mt-3 flex items-center justify-center bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-400 rounded-sm cursor-pointer" type="submit" onClick={handleConfirmUpdate}>
                                Confirm Update Student Data
                            </button>
                            <button className="mt-3 flex items-center justify-center bg-red-500 px-4 py-2 text-white hover:bg-red-400 rounded-sm cursor-pointer" type="submit" onClick={handleCancelUpdate}>
                                Cancel Update Student Data
                            </button>
                        </div>
                    </form>
                </div>
            ) : null }

            { updateMarks ? (
                <div>
                    <div className="min-h-100 w-200 rounded-lg shadow-lg border border-gray-200 p-6 bg-white">
                        <h1 className="text-2xl font-bold text-center">Update Student Marks - {useSwicth(name)} </h1>
                        <form>
                            <div className='pt-2 items-center justify-center'>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Sinhala</label>
                                <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" value={sinhalaMark} onChange={(e) => setSinhalaMark(e.target.value)}/>
                            </div>
                            <div className='pt-2 items-center justify-center'>
                                <label className="block text-gray-700 text-sm font-bold mb-2">English</label>
                                <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" value={englishMark} onChange={(e) => setEnglishMark(e.target.value)}/>
                            </div>
                            <div className='pt-2 items-center justify-center'>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Maths</label>
                                <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" value={mathsMark} onChange={(e) => setMathsMark(e.target.value)}/>
                            </div>
                            <div className='pt-2 items-center justify-center'>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Science</label>
                                <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" value={scienceMark} onChange={(e) => setScienceMark(e.target.value)}/>
                            </div>
                            <div className='pt-2 items-center justify-center'>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Religion</label>
                                <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" value={religionMark} onChange={(e) => setReligionMark(e.target.value)}/>
                            </div>
                            <div className='pt-2 items-center justify-center'>
                                <label className="block text-gray-700 text-sm font-bold mb-2">History</label>
                                <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" value={historyMark} onChange={(e) => setHistoryMark(e.target.value)}/>
                            </div>
                            <div className='pt-2 items-center justify-center'>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Optional Subject 01</label>
                                <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" value={op1Mark} onChange={(e) => setOP1Mark(e.target.value)}/>
                            </div>
                            <div className='pt-2 items-center justify-center'>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Optional Subject 02</label>
                                <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" value={op2Mark} onChange={(e) => setOP2Mark(e.target.value)}/>
                            </div>
                            <div className='pt-2 items-center justify-center'>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Optional Subject 03</label>
                                <input className="w-full items-center border border-gray-300 px-2 py-2 text-gray-700 rounded-lg" type="number" value={op3Mark} onChange={(e) => setOP3Mark(e.target.value)}/>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <button className="mt-3 flex items-center justify-center bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-400 rounded-sm cursor-pointer" type="submit" onClick={handleUpdateStudentMarks}>
                                    Update Student Marks
                                </button>
                                <button className="mt-3 flex items-center justify-center bg-red-500 px-4 py-2 text-white hover:bg-red-400 rounded-sm cursor-pointer" type="submit" onClick={handleCancelUpdateMarks}>
                                    Cancel Update Student Marks
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null }
        </div>
    );
}

export default StudentProfile;
