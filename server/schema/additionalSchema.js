const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLInt } = require('graphql');
const pool = require('../config/db');
const { TeacherType } = require('../types/Types');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {}
}); 

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Update Teacher Details ...
        updateTeacherDetails: {
            type: TeacherType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve (parent, args) {
                pool.query(
                    `UPDATE "Teachers" 
                        SET 
                            "First_Name" = $1, 
                            "Last_Name" = $2,  
                            "Email" = $3 
                        WHERE "id" = $4 RETURNING *`,
                    [args.firstName, args.lastName, args.email, args.id]
                ).then((result) => {
                    if(result.rows.length == 0) {
                        return { id: null }
                    } else {
                        return { id: result.rows[0].id }
                    }
                }).catch((error) => {
                    return error;
                });      
            }
        },
        // Delete Teacher Details ...
        deleteTeacherDetails: {
            type: TeacherType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve (parent, args) {
                await pool.query(
                    'DELETE FROM "Teachers" WHERE "id" = $1 RETURNING *',
                    [args.id]
                ).then((result) => {
                    if(result.rows.length == 0) {
                        return {
                            id: null
                        }
                    } else {
                        return {
                            id: result.rows[0].id,
                            firstName: result.rows[0].First_Name,
                            lastName: result.rows[0].Last_Name,
                            email: result.rows[0].Email
                        }
                    }
                }).catch((error) => {
                    return error;
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
})