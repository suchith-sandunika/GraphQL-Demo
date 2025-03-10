import { gql } from '@apollo/client';

// GraphQL Query Related to get all the students data ...
const GET_TEACHERS = gql`
    query GetTeachers {
        teachers {
            id
            firstName
            lastName
            email
        }
    }
`;

export default GET_TEACHERS;