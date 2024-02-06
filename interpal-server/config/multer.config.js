const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('file 1');
        console.log(file);
        cb(null, "../interpal-client/src/uploads");
        }
    ,
    filename: (req, file, cb) => {
        console.log('file 2');

        console.log(file);
        cb(null, `${Date.now()}-interpal-${file.originalname}`);
        }
    ,
});

const uploadFile = multer({storage: storage});

module.exports = {uploadFile};