import { gql } from '@apollo/client';

// Mutation Related to update the student marks ...
const UPDATE_STUDENT_MARKS = gql`
    mutation UpdateStudentMarks($id: ID!, $SinhalaSubjectMark: Int!, $ReligionSubjectMark: Int!, $ScienceSubjectMark: Int!, $MathsSubjectMark: Int!, $EnglishSubjectMark: Int!, $HistorySubjectMark: Int!, $OP1SubjectMark: Int!, $OP2SubjectMark: Int!, $OP3SubjectMark: Int!) {
        updateStudentMarks(id: $id, SinhalaSubjectMark: $SinhalaSubjectMark, ReligionSubjectMark: $ReligionSubjectMark, ScienceSubjectMark: $ScienceSubjectMark, MathsSubjectMark: $MathsSubjectMark, EnglishSubjectMark: $EnglishSubjectMark, HistorySubjectMark: $HistorySubjectMark, OP1SubjectMark: $OP1SubjectMark, OP2SubjectMark: $OP2SubjectMark, OP3SubjectMark: $OP3SubjectMark) {
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

export {  UPDATE_STUDENT_MARKS };