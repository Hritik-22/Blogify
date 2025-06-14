import { Readable } from 'stream';
import cloudinary from './cloudnary.js';

export const streamUploadFromBuffer = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'blogs',
                width: 500,
                crop: 'scale',
                quality: 'auto',
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        Readable.from(buffer).pipe(stream);
    });
}
