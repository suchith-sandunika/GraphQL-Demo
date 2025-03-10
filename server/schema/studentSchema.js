const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt } = require('graphql');
const pool = require('../config/db');
const { StudentType } = require('../types/Types');
const { hashPassword, verifyPassword } = require('../scripts/managePassword');
const { generateTokenForStudent } = require('../scripts/generateToken');
const { sendStudentEmail } = require('../utils/MailSending');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        students: {
            type: new GraphQLList(StudentType),
            async resolve(parent, args) {
                try {
                    const result = await pool.query('SELECT * FROM "Students"');
                    // return result.rows;
                    return result.rows.map(row => ({
                        id: row.id,
                        firstName: row["First_Name"],
                        lastName: row["Last_Name"],
                        email: row["Email"],
                        age: row["Age"],
                        password: row["Password"],
                        SinhalaSubjectMark: row["Sinhala_Subject_Mark"],
                        ReligionSubjectMark: row["Religion_Subject_Mark"],
                        ScienceSubjectMark: row["Science_Subject_Mark"],
                        MathsSubjectMark: row["Maths_Subject_Mark"],
                        EnglishSubjectMark: row["English_Subject_Mark"],
                        HistorySubjectMark: row["History_Subject_Mark"],
                        OP1SubjectMark: row["OP1_Subject_Mark"],
                        OP2SubjectMark: row["OP2_Subject_Mark"],
                        OP3SubjectMark: row["OP3_Subject_Mark"],
                        createdAt: row["Created_Date"],
                    }));
                } catch (error) {
                    return error;
                }
            }
        },
        student: {
            type: StudentType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                try {
                    const result = await pool.query('SELECT * FROM "Students" WHERE id = $1', [args.id]);
                    return result.rows[0];
                } catch (error) {
                    return error;
                }
                // return students.find(student => student.id == args.id);
            }
        },
        studentByName: {
            type: StudentType,
            args: { 
                firstName: { type: GraphQLString }, 
                lastName: { type: GraphQLString } 
            },
            async resolve(parent, args) {
                try {
                    const result = await pool.query('SELECT * FROM "Students" WHERE "First_Name" = $1 AND "Last_Name" = $2', [args.firstName, args.lastName]);
                    return {
                        id: result.rows[0].id,
                        firstName: result.rows[0]["First_Name"],
                        lastName: result.rows[0]["Last_Name"],
                        email: result.rows[0]["Email"],
                        age: result.rows[0]["Age"],
                        SinhalaSubjectMark: result.rows[0]["Sinhala_Subject_Mark"],
                        ReligionSubjectMark: result.rows[0]["Religion_Subject_Mark"],
                        ScienceSubjectMark: result.rows[0]["Science_Subject_Mark"],
                        MathsSubjectMark: result.rows[0]["Maths_Subject_Mark"],
                        EnglishSubjectMark: result.rows[0]["English_Subject_Mark"],
                        HistorySubjectMark: result.rows[0]["History_Subject_Mark"],
                        OP1SubjectMark: result.rows[0]["OP1_Subject_Mark"],
                        OP2SubjectMark: result.rows[0]["OP2_Subject_Mark"],
                        OP3SubjectMark: result.rows[0]["OP3_Subject_Mark"]
                    }
                } catch (error) {
                    return error;
                }
                // return students.find(student => student.firstName === args.firstName && student.lastName === args.lastName);
            }
        }
    }
}); 

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Student Registration ...
        studentRegister: {
            type: StudentType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                try {
                    const hashedPassword = await hashPassword(args.password);
                    
                    const result = await pool.query(
                        'INSERT INTO "Students" ("First_Name", "Last_Name", "Age", "Email", "Password") VALUES ($1, $2, $3, $4, $5) RETURNING *', 
                        [args.firstName, args.lastName, args.age, args.email, hashedPassword]
                    );

                    // Send email after registration ... 
                    sendStudentEmail(args.email, args.firstName, args.lastName, args.age);
                    
                    if(result.rows.length == 0) {
                        return {
                            id: null
                        };
                    } else {
                        return {
                            id: result.rows[0].id,
                            firstName: result.rows[0].First_Name,
                            lastName: result.rows[0].Last_Name,
                            age: result.rows[0].Age,
                            email: result.rows[0].Email,
                            password: result.rows[0].Password,
                            createdAt: result.rows[0].Created_Date,
                        };
                    }
                } catch (error) {
                    console.error(error);
                    // res.status(500).send("Server Error");
                    return error;
                }
            }
        },
        // Student Login ...
        studentLogin: {
            type: StudentType,
            args: {
                firstName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                try {
                    if(!args.email && !args.firstName) {
                        return "You must provide either email or firstName.";
                    } else {
                        let result = await pool.query(
                            'SELECT * FROM "Students" WHERE "First_Name" = $1 OR "Email" = $2', 
                            [args.firstName, args.email]
                        );

                        if(result.length == 0) {
                            return 'Incorrect name or email';
                        } else {
                            const dbPassword = result.rows[0].Password;
                            const checkPasswordValidity = await verifyPassword(args.password, dbPassword);
                            if(!checkPasswordValidity) {
                                return 'Incorrect password';
                            } else {
                                const token = generateTokenForStudent(result.rows[0].id);

                                let sessionResult = await pool.query(
                                    'INSERT INTO "SessionData" ("userId", "Role", "Token", "Status") VALUES ($1, $2, $3, $4) RETURNING *', 
                                    [result.rows[0].id, 'Student', token, 'Active']
                                );
            
                                if(sessionResult.rows.length == 0) {
                                    return { 
                                        id: null
                                    };
                                } else {
                                    return {
                                        id: sessionResult.rows[0].userId,
                                        firstName: result.rows[0].First_Name,
                                        lastName: result.rows[0].Last_Name,
                                        email: result.rows[0].Email
                                    }
                                }
                            }
                        }
                    }
                } catch (error) {
                    return error;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
})