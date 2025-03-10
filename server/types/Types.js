const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = require('graphql');

// Student Type ...
const StudentType = new GraphQLObjectType({
    name: 'Student',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        SinhalaSubjectMark: { type: GraphQLInt, defaultValue: 0 },
        ReligionSubjectMark: { type: GraphQLInt, defaultValue: 0 },
        ScienceSubjectMark: { type: GraphQLInt, defaultValue: 0 },
        MathsSubjectMark: { type: GraphQLInt, defaultValue: 0 },
        EnglishSubjectMark: { type: GraphQLInt, defaultValue: 0 },
        HistorySubjectMark: { type: GraphQLInt, defaultValue: 0 },
        OP1SubjectMark: { type: GraphQLInt, defaultValue: 0 },
        OP2SubjectMark: { type: GraphQLInt, defaultValue: 0 },
        OP3SubjectMark: { type: GraphQLInt, defaultValue: 0 },
        createdAt: { type: GraphQLString }
    })
});

// Teacher Type ...
const TeacherType = new GraphQLObjectType({
    name: 'Teacher',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        createdAt: { type: GraphQLString }
    })
}); 

module.exports = { StudentType, TeacherType };