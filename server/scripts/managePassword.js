const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordAfterHash = await bcrypt.hash(password, salt);
        
        if(passwordAfterHash) {
            return passwordAfterHash;
        } else {
            return 'Password hashing failed';
        }
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};

const verifyPassword = async (password, dbPassword) => {
    try {
        const result = await bcrypt.compare(password, dbPassword);

        if(!result) {
            return 'Password is incorrect';
        } else {
            return result;
        }
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
};

module.exports = { hashPassword, verifyPassword };