const express = require('express');
const colors = require('colors');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const path = require('path');

const schema = require('./schema/schema');
// const { connectDB } = require('./config/db');

require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

// Connect to the database ...
// connectDB();

// Serve files from the 'uploads' directory ...
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Enable CORS for development purposes ...
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // to send cookies ..
}));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

app.options("*", cors()); // Handle preflight requests ...

// app.get('/test-cors', cors(), (req, res) => {
//     res.json({ message: 'CORS is working!' });
// }); 

// // Explicit OPTIONS handler for /graphql
// app.options('/graphql', cors(), (req, res) => {
//     res.sendStatus(204); // Respond with 204 No Content
// });

// fetch('http://localhost:5000/test-cors')
//     .then(response => response.json())
//     .then(data => console.log(data));

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`.yellow.bold);
});