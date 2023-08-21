const jwt = require("jsonwebtoken")
const JWT_SECRET = "your-secret-key" // Same secret key as used in the controller

exports.ensureAuthenticated = (req, res, next) => {
	if (req.session.userId) {
		return next()
	}
	res.status(401).json({ message: "Not authenticated" })
}

exports.verifyToken = (req, res, next) => {
	const token = req.headers.authorization

	if (!token) {
		return res.status(401).json({ message: "Token not provided" })
	}

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: "Invalid token" })
		}
		req.userId = decoded.userId
		next()
	})
}
