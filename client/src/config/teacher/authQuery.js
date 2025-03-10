import { gql } from '@apollo/client';

// Mutation related to login ...
const TEACHER_LOGIN = gql`
    mutation LoginTeacher($firstName: String, $email: String, $password: String!) {
        teacherLogin(firstName: $firstName, email: $email, password: $password) {
            id
        }
    }
`;

// Mutation related to registration ...
const TEACHER_REGISTRATION = gql`
    mutation RegisterTeacher($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        teacherRegister(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            id,
            firstName,
            lastName,
            email,
            createdAt
        }
    } 
`;   

export { TEACHER_LOGIN, TEACHER_REGISTRATION };