const multer = require("multer");
const fs = require("fs-extra");

const VALID_FILE_TYPE_MAP = {
	"image/png": "png",
	"image/jpg": "jpg",
	"image/jpeg": "jpeg",
	"text/plain": "txt",
	"application/pdf": "pdf",
};

const multerUpload = multer({
	limits: { fileSize: 2 * 1024 * 1024 },
	fileFilter: (req, file, callback) => {
		const isValidType = VALID_FILE_TYPE_MAP[file.mimetype];

		if (!isValidType) {
			const err = new Error("Only .png, .jpg, .jpeg, .txt and .pdf format allowed!");
			err.name = "FileExtensionError";
			callback(err, false);
		} else {
			callback(null, true);
		}
	},
	storage: multer.diskStorage({
		destination: (req, file, callback) => {
			let path = "public/images/";

			if (req.body.username) {
				path += `profile-pics/${req.body.username.replace(/[ ,.]/g, "-")}`;
			} else {
				path += `tasks/${req.body.type.replace(/[ ,.]/g, "-")}`;
			}

			fs.mkdirsSync(path);
			callback(null, path);
		},
		filename: (req, file, callback) => {
			//originalname is the uploaded file's name with extension
			const fileName = file.originalname.replace(/[ ,.]/g, "-");
			const fileExtension = VALID_FILE_TYPE_MAP[file.mimetype];

			callback(null, `${fileName}-${Date.now()}.${fileExtension}`);
		},
	}),
});

module.exports = { multerUpload };
