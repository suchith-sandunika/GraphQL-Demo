import { gql } from '@apollo/client';

const DELETE_STUDENT = gql`
    mutation DeleteStudent($id: ID!) {
        deleteStudent(id: $id) {
            id,
            firstName,
            lastName,
            email,
            age
        }
    }
`; 

export default DELETE_STUDENT;