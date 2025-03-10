import { gql } from '@apollo/client';

// GraphQL Query Related to get all the students data ...
const GET_STUDENTS = gql`
    query GetStudents {
        students {
            id,
            firstName,
            lastName,
            email,
            age
        }
    }
`;

// Query Related to get the student data by student name ...
const STUDENT_DATA_BY_NAME = gql`
    query GetStudentDataByName ($firstName: String!, $lastName: String!) {
        studentByName(firstName: $firstName, lastName: $lastName) {
            id,
            firstName,
            lastName,
            email,
            age,
            SinhalaSubjectMark,
            ReligionSubjectMark,
            ScienceSubjectMark,
            MathsSubjectMark,
            EnglishSubjectMark,
            HistorySubjectMark,
            OP1SubjectMark,
            OP2SubjectMark,
            OP3SubjectMark
        }
    }
`;

export { GET_STUDENTS, STUDENT_DATA_BY_NAME };