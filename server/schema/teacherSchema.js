const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLInt } = require('graphql');
const pool = require('../config/db');
const { StudentType, TeacherType } = require('../types/Types');
const { hashPassword, verifyPassword } = require('../scripts/managePassword');
const { generateTokenForTeacher } = require('../scripts/generateToken');
const { sendteacherEmail } = require('../utils/MailSending');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        teachers: {
            type: new GraphQLList(TeacherType),
            async resolve(parent, args) {
                // return teachers;
                try {
                    const result = await pool.query('SELECT * FROM "Teachers"');
                    // return result.rows;
                    return result.rows.map(row => ({
                        id: row.id,
                        firstName: row["First_Name"], // Ensure correct case
                        lastName: row["Last_Name"],
                        email: row["Email"],
                        password: row["Password"],
                        createdAt: row["Created_Date"],
                    }));
                } catch (error) {
                    return error;
                }
            }
        },
        teacher: {
            type: TeacherType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                try {
                    const result = await pool.query('SELECT * FROM "Teachers" WHERE id = $1', [args.id]);
                    return result.rows[0];
                } catch (error) {
                    return error;
                }
                //return teachers.find(teacher => teacher.id == args.id);
            }
        }
    }
}); 

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Teacher Registration ...
        teacherRegister: {
            type: TeacherType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                try {
                    const hashedPassword = await hashPassword(args.password);
                    const result = await pool.query(
                        'INSERT INTO "Teachers" ("First_Name", "Last_Name", "Email", "Password") VALUES ($1, $2, $3, $4) RETURNING *', 
                        [args.firstName, args.lastName, args.email, hashedPassword]
                    );

                    // send email after registration ...
                    sendteacherEmail(args.email, args.firstName, args.lastName, ); 
                    
                    if(result.rows.length == 0) {
                        return 'Registration Failed';
                    } else {
                        return {
                            id: result.rows[0].id,
                            firstName: result.rows[0].First_Name,
                            lastName: result.rows[0].Last_Name,
                            email: result.rows[0].Email,
                            password: result.rows[0].Password,
                            createdAt: result.rows[0].Created_Date
                        };
                    }
                } catch (error) {
                    console.error(error);
                    // res.status(500).send("Server Error");
                    return error;
                }
            }
        },
        // Teacher Login ...
        teacherLogin: {
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
                            'SELECT * FROM "Teachers" WHERE "First_Name" = $1 OR "Email" = $2', 
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
                                const token = generateTokenForTeacher(result.rows[0].id);

                                let sessionResult = await pool.query(
                                    'INSERT INTO "SessionData" ("userId", "Role", "Token", "Status") VALUES ($1, $2, $3, $4) RETURNING *', 
                                    [result.rows[0].id, 'Teacher', token, 'Active']
                                );
            
                                if(sessionResult.rows.length == 0) {
                                    return { 
                                        id: null
                                    };
                                } else {
                                    return {
                                        id: sessionResult.rows[0].userId
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
});