const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Declare a specific path ...
const imagePath = path.join(__dirname, '../uploads');

// Ensure directory exists or create directory ...
if(!fs.existsSync(imagePath)){
    fs.mkdirSync(imagePath, { recursive: true });
}

// Configure multer for image uploads with path ...
const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, imagePath);
    },
    filename: (req, res, callback) => {
        const fileName = Date.now() + '_' + file.originalname;
        callback(null, fileName);
    }
});

// Filter File Formats ...
const fileFilter = (req, res, callback) => {
    const allowedExtensions = /jpeg|jpg|png|gif/;
    const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedExtensions.test(file.mimetype);

    if (extName && mimeType) {
        callback(null, true);
    } else {
        callback(new Error('Only image files are allowed!'), false);
    }
};

// Configure the upload middleware with file size limit and filter ...
const upload = multer({
    storage: storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

// Export the upload middleware ...
module.exports = upload;