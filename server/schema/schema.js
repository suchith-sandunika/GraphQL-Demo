const { mergeSchemas } = require('@graphql-tools/schema');
const { GraphQLSchema } = require('graphql');
const studentSchema = require('./studentSchema');
const teacherSchema = require('./teacherSchema');
const commonSchema = require('./commonSchema');
const additionalSchema = require('./additionalSchema');

const mergedSchema = mergeSchemas({
    schemas: [studentSchema, teacherSchema, commonSchema, additionalSchema]
});

module.exports = mergedSchema;

// const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt } = require('graphql');
// const pool = require('../config/db');
// const { hashPassword, verifyPassword } = require('../scripts/managePassword');
// const { generateTokenForStudent, generateTokenForTeacher } = require('../scripts/generateToken');

// // Student Type ...
// const StudentType = new GraphQLObjectType({
//     name: 'Student',
//     fields: () => ({
//         id: { type: GraphQLID },
//         firstName: { type: GraphQLString },
//         lastName: { type: GraphQLString },
//         age: { type: GraphQLInt },
//         email: { type: GraphQLString },
//         password: { type: GraphQLString },
//         SinhalaSubjectMark: { type: GraphQLInt, defaultValue: 0 },
//         ReligionSubjectMark: { type: GraphQLInt, defaultValue: 0 },
//         ScienceSubjectMark: { type: GraphQLInt, defaultValue: 0 },
//         MathsSubjectMark: { type: GraphQLInt, defaultValue: 0 },
//         EnglishSubjectMark: { type: GraphQLInt, defaultValue: 0 },
//         HistorySubjectMark: { type: GraphQLInt, defaultValue: 0 },
//         OP1SubjectMark: { type: GraphQLInt, defaultValue: 0 },
//         OP2SubjectMark: { type: GraphQLInt, defaultValue: 0 },
//         OP3SubjectMark: { type: GraphQLInt, defaultValue: 0 },
//         createdAt: { type: GraphQLString }
//     })
// }); 

// // Teacher Type ...
// const TeacherType = new GraphQLObjectType({
//     name: 'Teacher',
//     fields: () => ({
//         id: { type: GraphQLID },
//         firstName: { type: GraphQLString },
//         lastName: { type: GraphQLString },
//         email: { type: GraphQLString },
//         password: { type: GraphQLString },
//         createdAt: { type: GraphQLString }
//     })
// });

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         students: {
//             type: new GraphQLList(StudentType),
//             async resolve(parent, args) {
//                 try {
//                     const result = await pool.query('SELECT * FROM "Students"');
//                     // return result.rows;
//                     return result.rows.map(row => ({
//                         id: row.id,
//                         firstName: row["First_Name"], // Ensure correct case
//                         lastName: row["Last_Name"],
//                         email: row["Email"],
//                         age: row["Age"],
//                         password: row["Password"],
//                         SinhalaSubjectMark: row["Sinhala_Subject_Mark"],
//                         ReligionSubjectMark: row["Religion_Subject_Mark"],
//                         ScienceSubjectMark: row["Science_Subject_Mark"],
//                         MathsSubjectMark: row["Maths_Subject_Mark"],
//                         EnglishSubjectMark: row["English_Subject_Mark"],
//                         HistorySubjectMark: row["History_Subject_Mark"],
//                         OP1SubjectMark: row["OP1_Subject_Mark"],
//                         OP2SubjectMark: row["OP2_Subject_Mark"],
//                         OP3SubjectMark: row["OP3_Subject_Mark"],
//                         createdAt: row["Created_Date"],
//                     }));
//                 } catch (error) {
//                     return error;
//                 }
//             }
//         },
//         student: {
//             type: StudentType,
//             args: { id: { type: GraphQLID } },
//             async resolve(parent, args) {
//                 try {
//                     const result = await pool.query('SELECT * FROM "Students" WHERE id = $1', [args.id]);
//                     return result.rows[0];
//                 } catch (error) {
//                     return error;
//                 }
//                 // return students.find(student => student.id == args.id);
//             }
//         },
//         teachers: {
//             type: new GraphQLList(TeacherType),
//             async resolve(parent, args) {
//                 // return teachers;
//                 try {
//                     const result = await pool.query('SELECT * FROM "Teachers"');
//                     // return result.rows;
//                     return result.rows.map(row => ({
//                         id: row.id,
//                         firstName: row["First_Name"], // Ensure correct case
//                         lastName: row["Last_Name"],
//                         email: row["Email"],
//                         password: row["Password"],
//                         createdAt: row["Created_Date"],
//                     }));
//                 } catch (error) {
//                     return error;
//                 }
//             }
//         },
//         teacher: {
//             type: TeacherType,
//             args: { id: { type: GraphQLID } },
//             async resolve(parent, args) {
//                 try {
//                     const result = await pool.query('SELECT * FROM "Teachers" WHERE id = $1', [args.id]);
//                     return result.rows[0];
//                 } catch (error) {
//                     return error;
//                 }
//                 //return teachers.find(teacher => teacher.id == args.id);
//             }
//         }
//     }
// }); 

// const mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         // Student Registration ...
//         studentRegister: {
//             type: StudentType,
//             args: {
//                 firstName: { type: new GraphQLNonNull(GraphQLString) },
//                 lastName: { type: new GraphQLNonNull(GraphQLString) },
//                 age: { type: new GraphQLNonNull(GraphQLInt) },
//                 email: { type: new GraphQLNonNull(GraphQLString) },
//                 password: { type: new GraphQLNonNull(GraphQLString) },
//                 // createdAt: { type: new GraphQLNonNull(GraphQLString) }
//             },
//             async resolve(parent, args) {
//                 try {
//                     const hashedPassword = await hashPassword(args.password);
//                     const result = await pool.query(
//                         'INSERT INTO "Students" ("First_Name", "Last_Name", "Age", "Email", "Password") VALUES ($1, $2, $3, $4, $5) RETURNING *', 
//                         [args.firstName, args.lastName, args.age, args.email, hashedPassword]
//                     );
//                     // 
//                     return {
//                         id: result.rows[0].id,
//                         firstName: result.rows[0].First_Name,
//                         lastName: result.rows[0].Last_Name,
//                         age: result.rows[0].Age,
//                         email: result.rows[0].Email,
//                         password: result.rows[0].Password,
//                         createdAt: result.rows[0].Created_Date,
//                     };
//                 } catch (error) {
//                     console.error(error);
//                     // res.status(500).send("Server Error");
//                     return error;
//                 }
//             }
//         },
//         // Student Login ...
//         studentLogin: {
//             type: StudentType,
//             args: {
//                 firstName: { type: GraphQLString },
//                 email: { type: GraphQLString },
//                 password: { type: new GraphQLNonNull(GraphQLString) },
//             },
//             async resolve(parent, args) {
//                 try {
//                     if(!args.email && !args.firstName) {
//                         return "You must provide either email or firstName.";
//                     } else {
//                         let result = await pool.query(
//                             'SELECT * FROM "Students" WHERE "First_Name" = $1 OR "Email" = $2', 
//                             [args.firstName, args.email]
//                         );

//                         if(result.length == 0) {
//                             return 'Incorrect name or email';
//                         } else {
//                             const dbPassword = result.rows[0].Password;
//                             const checkPasswordValidity = await verifyPassword(args.password, dbPassword);
//                             if(!checkPasswordValidity) {
//                                 return 'Incorrect password';
//                             } else {
//                                 const token = generateTokenForStudent(result.rows[0].id);

//                                 let sessionResult = await pool.query(
//                                     'INSERT INTO "SessionData" ("userId", "Role", "Token", "Status") VALUES ($1, $2, $3, $4) RETURNING *', 
//                                     [result.rows[0].id, 'Student', token, 'Active']
//                                 );
            
//                                 if(sessionResult.rows.length == 0) {
//                                     return { 
//                                         id: null
//                                     };
//                                 } else {
//                                     return {
//                                         id: sessionResult.rows[0].userId
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 } catch (error) {
//                     return error;
//                 }
//             }
//         },
//         // Teacher Registration ...
//         teacherRegister: {
//             type: TeacherType,
//             args: {
//                 firstName: { type: new GraphQLNonNull(GraphQLString) },
//                 lastName: { type: new GraphQLNonNull(GraphQLString) },
//                 email: { type: new GraphQLNonNull(GraphQLString) },
//                 password: { type: new GraphQLNonNull(GraphQLString) },
//             },
//             async resolve(parent, args) {
//                 try {
//                     const hashedPassword = await hashPassword(args.password);
//                     const result = await pool.query(
//                         'INSERT INTO "Teachers" ("First_Name", "Last_Name", "Email", "Password") VALUES ($1, $2, $3, $4) RETURNING *', 
//                         [args.firstName, args.lastName, args.email, hashedPassword]
//                     );
//                     // 
//                     return {
//                         id: result.rows[0].id,
//                         firstName: result.rows[0].First_Name,
//                         lastName: result.rows[0].Last_Name,
//                         email: result.rows[0].Email,
//                         password: result.rows[0].Password,
//                         createdAt: result.rows[0].Created_Date
//                     };
//                 } catch (error) {
//                     console.error(error);
//                     // res.status(500).send("Server Error");
//                     return error;
//                 }
//             }
//         },
//         // Teacher Login ...
//         teacherLogin: {
//             type: StudentType,
//             args: {
//                 firstName: { type: GraphQLString },
//                 email: { type: GraphQLString },
//                 password: { type: new GraphQLNonNull(GraphQLString) },
//             },
//             async resolve(parent, args) {
//                 try {
//                     if(!args.email && !args.firstName) {
//                         return "You must provide either email or firstName.";
//                     } else {
//                         let result = await pool.query(
//                             'SELECT * FROM "Teachers" WHERE "First_Name" = $1 OR "Email" = $2', 
//                             [args.firstName, args.email]
//                         );

//                         if(result.length == 0) {
//                             return 'Incorrect name or email';
//                         } else {
//                             const dbPassword = result.rows[0].Password;
//                             const checkPasswordValidity = await verifyPassword(args.password, dbPassword);
//                             if(!checkPasswordValidity) {
//                                 return 'Incorrect password';
//                             } else {
//                                 const token = generateTokenForTeacher(result.rows[0].id);

//                                 let sessionResult = await pool.query(
//                                     'INSERT INTO "SessionData" ("userId", "Role", "Token", "Status") VALUES ($1, $2, $3, $4) RETURNING *', 
//                                     [result.rows[0].id, 'Teacher', token, 'Active']
//                                 );
            
//                                 if(sessionResult.rows.length == 0) {
//                                     return { 
//                                         id: null
//                                     };
//                                 } else {
//                                     return {
//                                         id: sessionResult.rows[0].userId
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 } catch (error) {
//                     return error;
//                 }
//             }
//         },
//         // Update Student Marks ...
//         updateStudentMarks: {
//             type: StudentType,
//             args: {
//                 id: { type: new GraphQLNonNull(GraphQLID) },
//                 SinhalaSubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
//                 ReligionSubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
//                 ScienceSubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
//                 MathsSubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
//                 EnglishSubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
//                 HistorySubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
//                 OP1SubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
//                 OP2SubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
//                 OP3SubjectMark: { type: new GraphQLNonNull(GraphQLInt) }
//             },
//             async resolve(parent, args) {
//                 try {
//                     const updateStudentMarksResult = await pool.query(
//                         `UPDATE "Students" 
//                             SET "Sinhala_Subject_Mark" = $1, 
//                                 "Religion_Subject_Mark" = $2, 
//                                 "Science_Subject_Mark" = $3, 
//                                 "Maths_Subject_Mark" = $4, 
//                                 "English_Subject_Mark" = $5, 
//                                 "History_Subject_Mark" = $6, 
//                                 "OP1_Subject_Mark" = $7, 
//                                 "OP2_Subject_Mark" = $8, 
//                                 "OP3_Subject_Mark" = $9 
//                             WHERE id = $10 RETURNING *`,
//                             [ 
//                                 args.SinhalaSubjectMark, 
//                                 args.ReligionSubjectMark, 
//                                 args.ScienceSubjectMark, 
//                                 args.MathsSubjectMark, 
//                                 args.EnglishSubjectMark, 
//                                 args.HistorySubjectMark, 
//                                 args.OP1SubjectMark, 
//                                 args.OP2SubjectMark, 
//                                 args.OP3SubjectMark, 
//                                 args.id
//                             ]
//                     );

//                     if(updateStudentMarksResult.rows.length == 0) {
//                         return 'Student not found';
//                     } else {
//                         return {
//                             id: updateStudentMarksResult.rows[0].id,
//                             firstName: updateStudentMarksResult.rows[0].First_Name,
//                             lastName: updateStudentMarksResult.rows[0].Last_Name,
//                             email: updateStudentMarksResult.rows[0].Email,
//                             password: updateStudentMarksResult.rows[0].Password,
//                             createdAt: updateStudentMarksResult.rows[0].Created_Date,
//                             SinhalaSubjectMark: updateStudentMarksResult.rows[0].Sinhala_Subject_Mark,
//                             ReligionSubjectMark: updateStudentMarksResult.rows[0].Religion_Subject_Mark,
//                             ScienceSubjectMark: updateStudentMarksResult.rows[0].Science_Subject_Mark,
//                             MathsSubjectMark: updateStudentMarksResult.rows[0].Maths_Subject_Mark,
//                             EnglishSubjectMark: updateStudentMarksResult.rows[0].English_Subject_Mark,
//                             HistorySubjectMark: updateStudentMarksResult.rows[0].History_Subject_Mark,
//                             OP1SubjectMark: updateStudentMarksResult.rows[0].OP1_Subject_Mark,
//                             OP2SubjectMark: updateStudentMarksResult.rows[0].OP2_Subject_Mark,
//                             OP3SubjectMark: updateStudentMarksResult.rows[0].OP3_Subject_Mark
//                         }
//                     }
//                 } catch (error) {
//                     return error;
//                 }
//             }
//         }
//     }
// });

// module.exports = new GraphQLSchema({
//     query: RootQuery,
//     mutation: mutation
// });