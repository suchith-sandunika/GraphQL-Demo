import { gql } from '@apollo/client';

// Mutation related to logout ...
const LOGOUT = gql`
    mutation LogOut {
        logout {
            id
        }
    }
`; 

export default LOGOUT;