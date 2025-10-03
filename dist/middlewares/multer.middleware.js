import multer from "multer";
// check if the uploaded file is an allowed image type
function checkFileType(file, cb) {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Error: Image only"));
    }
}
// multer middleware for handling a single image upload in memory
export const multerUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        checkFileType(file, cb);
    },
}).single("image");
// multer middleware for handling a single image upload in memory
export const multerMulipleUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        checkFileType(file, cb);
    },
}).array("images", 10);
//# sourceMappingURL=multer.middleware.js.map