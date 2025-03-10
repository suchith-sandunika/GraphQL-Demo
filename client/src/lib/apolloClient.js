// lib/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  credentials: "include", // Ensures cookies ...
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true // Enables Apollo Client DevTools ...
});

export default client;

// "use client";
// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// // const client = new ApolloClient({
// //     link: new HttpLink({
// //         uri: 'http://localhost:5000/graphql',
// //         credentials: 'same-origin',
// //     }),
// //     cache: new InMemoryCache(),
// //     ssrMode: false, // Ensure Apollo does not run on the server
// // });

// const client = new ApolloClient({
//     uri: "http://localhost:5000/graphql", // Change this to your backend GraphQL API
//     cache: new InMemoryCache(),
// });

// const AppolloWrapper = ({ Children }) => {
//     return (
//         <ApolloProvider client={client}>
//             {Children}
//         </ApolloProvider>
//     );
// }

// export default AppolloWrapper;