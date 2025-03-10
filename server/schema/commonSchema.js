const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLInt } = require('graphql');
const pool = require('../config/db');
const { StudentType, TeacherType } = require('../types/Types');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {}
}); 

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Update Student Basic Details ...
        updateStudentDetails: {
            type: StudentType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                age: { type: GraphQLInt },
                email: { type: GraphQLString }
            },
            async resolve (parent, args) {
                try {
                    const updateStudentDetailsResult = await pool.query(
                        `UPDATE "Students" 
                        SET 
                            "First_Name" = $1, 
                            "Last_Name" = $2, 
                            "Age" = $3, 
                            "Email" = $4 
                        WHERE "id" = $5 RETURNING *`,
                        [args.firstName, args.lastName, args.age, args.email, args.id]
                    );

                    if(updateStudentDetailsResult.rows.length == 0) {
                        return {
                            id: null
                        };
                    } else {
                        return {
                            id: updateStudentDetailsResult.rows[0].id,
                            firstName: updateStudentDetailsResult.rows[0].First_Name,
                            lastName: updateStudentDetailsResult.rows[0].Last_Name,
                            age: updateStudentDetailsResult.rows[0].Age,
                            email: updateStudentDetailsResult.rows[0].Email,
                            createdAt: updateStudentDetailsResult.rows[0].Created_Date,
                        }
                    }
                } catch (error) {
                    return error;
                }
            }
        },
        // Update Student Marks ...
        updateStudentMarks: {
            type: StudentType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                SinhalaSubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
                ReligionSubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
                ScienceSubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
                MathsSubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
                EnglishSubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
                HistorySubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
                OP1SubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
                OP2SubjectMark: { type: new GraphQLNonNull(GraphQLInt) },
                OP3SubjectMark: { type: new GraphQLNonNull(GraphQLInt) }
            },
            async resolve(parent, args) {
                try {
                    const updateStudentMarksResult = await pool.query(
                        `UPDATE "Students" 
                            SET "Sinhala_Subject_Mark" = $1, 
                                "Religion_Subject_Mark" = $2, 
                                "Science_Subject_Mark" = $3, 
                                "Maths_Subject_Mark" = $4, 
                                "English_Subject_Mark" = $5, 
                                "History_Subject_Mark" = $6, 
                                "OP1_Subject_Mark" = $7, 
                                "OP2_Subject_Mark" = $8, 
                                "OP3_Subject_Mark" = $9 
                            WHERE id = $10 RETURNING *`,
                            [ 
                                args.SinhalaSubjectMark, 
                                args.ReligionSubjectMark, 
                                args.ScienceSubjectMark, 
                                args.MathsSubjectMark, 
                                args.EnglishSubjectMark, 
                                args.HistorySubjectMark, 
                                args.OP1SubjectMark, 
                                args.OP2SubjectMark, 
                                args.OP3SubjectMark, 
                                args.id
                            ]
                    );

                    if(updateStudentMarksResult.rows.length == 0) {
                        return 'Student not found';
                    } else {
                        return {
                            id: updateStudentMarksResult.rows[0].id,
                            firstName: updateStudentMarksResult.rows[0].First_Name,
                            lastName: updateStudentMarksResult.rows[0].Last_Name,
                            email: updateStudentMarksResult.rows[0].Email,
                            password: updateStudentMarksResult.rows[0].Password,
                            createdAt: updateStudentMarksResult.rows[0].Created_Date,
                            SinhalaSubjectMark: updateStudentMarksResult.rows[0].Sinhala_Subject_Mark,
                            ReligionSubjectMark: updateStudentMarksResult.rows[0].Religion_Subject_Mark,
                            ScienceSubjectMark: updateStudentMarksResult.rows[0].Science_Subject_Mark,
                            MathsSubjectMark: updateStudentMarksResult.rows[0].Maths_Subject_Mark,
                            EnglishSubjectMark: updateStudentMarksResult.rows[0].English_Subject_Mark,
                            HistorySubjectMark: updateStudentMarksResult.rows[0].History_Subject_Mark,
                            OP1SubjectMark: updateStudentMarksResult.rows[0].OP1_Subject_Mark,
                            OP2SubjectMark: updateStudentMarksResult.rows[0].OP2_Subject_Mark,
                            OP3SubjectMark: updateStudentMarksResult.rows[0].OP3_Subject_Mark
                        }
                    }
                } catch (error) {
                    return error;
                }
            }
        },
        // Delete Student ...
        deleteStudent: {
            type: StudentType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            async resolve(parent, args) {
                try {
                    const deleteStudentResult = await pool.query(
                        `DELETE FROM "Students" WHERE "id" = $1 RETURNING *`,
                        [args.id]
                    );

                    if(deleteStudentResult.rows.length == 0) {
                        id: null
                    } else {
                        return {
                            id: deleteStudentResult.rows[0].id,
                            firstName: deleteStudentResult.rows[0].First_Name,
                            lastName: deleteStudentResult.rows[0].Last_Name,
                            age: deleteStudentResult.rows[0].Age,
                            email: deleteStudentResult.rows[0].Email,
                            createdAt: deleteStudentResult.rows[0].Created_Date,
                            SinhalaSubjectMark: deleteStudentResult.rows[0].Sinhala_Subject_Mark,
                            ReligionSubjectMark: deleteStudentResult.rows[0].Religion_Subject_Mark,
                            ScienceSubjectMark: deleteStudentResult.rows[0].Science_Subject_Mark,
                            MathsSubjectMark: deleteStudentResult.rows[0].Maths_Subject_Mark,
                            EnglishSubjectMark: deleteStudentResult.rows[0].English_Subject_Mark,
                            HistorySubjectMark: deleteStudentResult.rows[0].History_Subject_Mark,
                            OP1SubjectMark: deleteStudentResult.rows[0].OP1_Subject_Mark,
                            OP2SubjectMark: deleteStudentResult.rows[0].OP2_Subject_Mark,
                            OP3SubjectMark: deleteStudentResult.rows[0].OP3_Subject_Mark
                        }
                    }
                } catch (error) {
                    return error;
                }
            }
        },
        logout: {
            type: StudentType,
            args: {},
            async resolve(parent, args) {
                try {
                    const endSessionResult = await pool.query(
                        `UPDATE "SessionData" 
                            SET "Status" = 'Inactive' 
                            WHERE "Created_Date" = (SELECT MAX("Created_Date") FROM "SessionData") 
                        RETURNING *`
                    );

                    if(endSessionResult.rows.length == 0) {
                        return {
                            id: null
                        };
                    } else {
                        return {
                            id: endSessionResult.rows[0].userId
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