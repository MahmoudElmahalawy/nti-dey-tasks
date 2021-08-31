const expressJwt = require("express-jwt");

const authJwt = () => {
	return expressJwt({
		secret: process.env.JWT_SECRET,
		algorithms: ["HS256"],
		isRevoked: async function (req, payload, done) {
			let { originalUrl } = req;
			if (
				!(
					(originalUrl.startsWith("/tasks/employee/") || originalUrl.startsWith("/tasks/note/")) &&
					originalUrl.split("/")[originalUrl.length - 1] !== payload.userId
				) &&
				payload.position !== "manager"
			) {
				done(null, true);
			}
			done();
		},
	}).unless({
		path: [
			// /\/(.*)/,
			// { url: /\/tasks(.*)/, method: ["GET", "OPTIONS"] },
			// `/users/register`,
			`/users/login`,
		],
	});
};

module.exports = authJwt;
