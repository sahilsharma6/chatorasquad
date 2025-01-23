import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('files : ',file);
        
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });

const upload = multer({storage: storage});

const uploadMiddleware = upload.array('images' , 5);
export default uploadMiddleware;

