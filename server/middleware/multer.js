import multer from "multer";
import { extname } from "path";

const storage = multer.memoryStorage();

//  this is for image validation --

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const ext = extname(file.originalname).toLowerCase();
    const isValid = allowedTypes.test(ext) && allowedTypes.test(file.mimetype);

    cb(isValid ? null : new Error("Only JPEG, JPG, PNG, or WEBP files are allowed"), isValid);
};
const upload = multer({ storage, fileFilter });

export default upload;
