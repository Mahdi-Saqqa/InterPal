const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../interpal-client/src/uploads");
        }
    ,
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, `${Date.now()}-interpal-${file.originalname}`);
        }
    ,
});

const uploadFile = multer({storage: storage});

module.exports = {uploadFile};