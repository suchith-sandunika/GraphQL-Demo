const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const pool = new Pool({
  user: process.env.POSTGRES_USERNAME,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  // ssl: process.env.NODE_ENV === 'production'? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(() => console.log(`Connected to PostgreSQL Database on port ${process.env.POSTGRES_PORT}!`.cyan.bold))
  .catch((err) => console.error("Connection error!", err));

module.exports = pool;


// const sql = require('mssql');
// require('dotenv').config();

// const config = {
//     server: "DESKTOP-2G8D03G\\SQLEXPRESS",
//     authentication: {
//       type: "ntlm",
//       options: {
//         domain: "DESKTOP-2G8D03G",
//         userName: "Suchith Sandunika",
//         password: "",  // No password needed for Windows Authentication
//       },
//     },
//     database: "RegistrationDB",
//     options: {
//       trustServerCertificate: true,  // Required for self-signed SSL
//       encrypt: false,  // Use false for Windows Authentication
//     },
// };

// // Connect the MSSQL Database ...
// const connectDB = async () => {
//     try {
//         await sql.connect(config);
//         console.log('Connected to MSSQL Database'.cyan);
//     } catch (error) {
//         console.error('Error connecting to the database:', error);
//     }
// }; 

// module.exports = { connectDB, sql };
