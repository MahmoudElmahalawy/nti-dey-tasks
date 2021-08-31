const mongoose = require("mongoose");
const router = require("express").Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const { multerUpload } = require("../helpers/multer-upload");

// get all users
router.get("/", (req, res) => {
	User.find()
		.populate("tasks")
		.then((users) => {
			return res.status(200).json({ success: true, users });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// get user by id
router.get("/:id", (req, res) => {
	User.findById(req.params.id)
		.populate("tasks")
		.then((user) => {
			return res.status(200).json({ success: true, user });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// add new user
router.post("/", multerUpload.single("profileImage"), (req, res) => {
	const { username, password: passwordPlainTxt, phone, position, jobTitle, isSuspended = false } = req.body;
	const password = bcrypt.hashSync(passwordPlainTxt, bcrypt.genSaltSync(10));

	const dir = username.replace(/[ ,.]/g, "-");
	const basePath = `${req.protocol}://${req.get("host")}/images/profile-pics/${dir}/`;
	const imageUri = `${basePath}${req.file.filename}`;

	const user = new User({ username, password, phone, position, jobTitle, profileImage: imageUri });

	user.save()
		.then((user) => {
			return res.status(200).json({ success: true, user });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// edit user
router.patch("/:id", (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})
		.then((user) => {
			return res.status(200).json({ success: true, user });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// delete user
router.delete("/:id", (req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then((user) => {
			return res.status(200).json({ success: true, user });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// user login
router.post("/login", (req, res) => {
	const { username, password } = req.body;

	User.findOne({ username })
		.then((user) => {
			if (!user) return res.status(400).json({ success: false, message: "This username doesn't exist!" });
			if (!bcrypt.compareSync(password, user.password)) {
				return res
					.status(400)
					.json({ success: false, message: "Authentication failed, password is incorrect!" });
			} else {
				const token = jwt.sign({ userId: user._id, position: user.position }, process.env.JWT_SECRET, {
					expiresIn: "1d",
				});
				res.status(200).json({ success: true, username: user.username, userId: user._id, token });
			}
		})
		.catch((err) => {
			// console.log(err);
			res.status(400).json({ success: false, message: err });
		});
});

module.exports = router;
