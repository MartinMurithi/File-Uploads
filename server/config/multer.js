const multer = require("multer");

const maxFileSize = 1024 * 1024 * 5;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type, only jpg, jpeg and png are allowed!!"),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxFileSize,
  },
  fileFilter: fileFilter,
});

const fileSizeLimitErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.send(`Please select a file smaller than 5 mb`);
  } else if (err) {
    return res.send(`${err}`);
  }
  next(err);
};

module.exports = { upload, fileSizeLimitErrorHandler };
