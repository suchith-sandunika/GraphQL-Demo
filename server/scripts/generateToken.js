const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const generateTokenForStudent = (id) => {
    try {
        const token = jwt.sign({
            id: id,
            role: 'Student',
    
        }, process.env.JWT_SECRET, { expiresIn: '2h' });
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw error;
    }
};

const generateTokenForTeacher = (id) => {
    try {
        const token = jwt.sign({
            id: id,
            role: 'Teacher',
    
        }, process.env.JWT_SECRET, { expiresIn: '2h' });
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw error;
    }
};

module.exports = { generateTokenForStudent, generateTokenForTeacher };