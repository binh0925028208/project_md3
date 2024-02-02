import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dzk6s6cvc",
  api_key: "315828545543434",
  api_secret: "Js5AarxXi7qN0eUuTwivEergpOc",
});

const store = new CloudinaryStorage({
  cloudinary,
  params: async (req, file: any) => {
    return {
      folder: "images",
      format: "png",
    };
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  // Kiểm tra kiểu file
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    console.log(file);
    if (file.size > maxSize) {
      cb(null, false);
    } else {
      cb(null, true);
    }
  } else {
    cb("Upload failed", false);
  }
};

const uploadCloud = multer({
  storage: store,
  fileFilter,
});

export default uploadCloud;
