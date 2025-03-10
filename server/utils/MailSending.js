const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const appEmail = process.env.APP_EMAIL;
const appPassword = process.env.APP_PASSWORD;

// Send Email to student after registration ...
const sendStudentEmail = (email, firstName, lastName, age) => {
    const mailOptions = {
        from: appEmail,
        to: email,
        subject: `Student Registration Successfull for ${firstName} ${lastName}`,
        text: `Dear ${firstName} ${lastName},\n\nThank you for registering as a student at our system. Your registration was successful. You are now eligible to proceed.\n\nYour details are:\nName: ${firstName} ${lastName}\nAge: ${age}\nEmail: ${email}\n\nPlease remember to keep your personal details confidential and secure.\n\nBest regards,\nManagement Team`
    };

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: appEmail,
            pass: appPassword
        },
        tls: {
            rejectUnauthorized: false // Disable certificate validation ...
        }
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred while sending Mail:', error);
            return;
        } else {
            console.log('Mail sent successfully:', info.response);
        }
    });
}

// Send Email to teacher after registration ...
const sendteacherEmail = (email, firstName, lastName) => {
    const mailOptions = {
        from: appEmail,
        to: email,
        subject: `Teacher Registration Successfull for ${firstName} ${lastName}`,
        text: `Dear ${firstName} ${lastName},\n\nThank you for registering as a Teacher at our system. Your registration was successful. You are now eligible to proceed.\n\nYour details are:\nName: ${firstName} ${lastName}\nEmail: ${email}\n\nPlease remember to keep your personal details confidential and secure.\n\nBest regards,\nManagement Team`
    };

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: appEmail,
            pass: appPassword
        },
        tls: {
            rejectUnauthorized: false // Disable certificate validation ...
        }
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred while sending Mail:', error);
            return 'Success!';
        } else {
            console.log('Mail sent successfully:', info.response);
        }
    });
}

module.exports = { sendStudentEmail, sendteacherEmail };