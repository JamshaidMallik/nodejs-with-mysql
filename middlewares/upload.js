import multer from 'multer';
import path from 'path';

export const uploadProfileImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads/profile-images'),
        filename: (req, file, cb) =>
            cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`),
    }),
});

export const uploadPostImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads/post-images'),
        filename: (req, file, cb) =>
            cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`),
    }),
});
