import multer from 'multer';
import path from 'path';

export const uploadProfileImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads/profile-images'),
        filename: (req, file, cb) =>
            cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`),
    }),
});

// 🔥 Combine image + video fields
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'image') {
            cb(null, 'uploads/post-images');
        } else if (file.fieldname === 'video') {
            cb(null, 'uploads/video-files');
        } else {
            cb(new Error('Unsupported file type'), null);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`);
    },
});

// 🔒 File filter for validation
const fileFilter = (req, file, cb) => {
    const imageTypes = /jpeg|jpg|png|webp/;
    const videoTypes = /mp4|mov|avi|mkv/;
    const ext = path.extname(file.originalname).toLowerCase();

    if (file.fieldname === 'image' && imageTypes.test(ext)) {
        cb(null, true);
    } else if (file.fieldname === 'video' && videoTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only image and video files allowed'));
    }
};

// 🎯 Final middleware to handle both
export const uploadPostMedia = multer({
    storage,
    fileFilter,
});