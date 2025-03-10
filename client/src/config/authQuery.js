import { gql } from '@apollo/client';

// Mutation related to login ...
const STUDENT_LOGIN = gql`
    mutation LoginStudent($firstName: String, $email: String, $password: String!) {
        studentLogin(firstName: $firstName, email: $email, password: $password) {
            id,
            firstName,
            lastName,
            email
        }
    }
`;

// Mutation related to registration ...
const STUDENT_REGISTRATION = gql`
    mutation RegisterStudent($firstName: String!, $lastName: String!, $email: String!, $age: Int!, $password: String!) {
        studentRegister(firstName: $firstName, lastName: $lastName, email: $email, age: $age, password: $password) {
            id
            firstName
            lastName
            age
            email
            createdAt
        }
    } 
`;  

// Mutation related to logout ...
const LOGOUT = gql`
    mutation LogOut {
        logout {
            id
        }
    }
`; 

export { STUDENT_LOGIN, STUDENT_REGISTRATION, LOGOUT };