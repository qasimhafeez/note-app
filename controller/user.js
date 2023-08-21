const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/constant")
const { User } = require("../models/UserNoteAssociation")

exports.register = async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
			created_at: new Date(),
		})

		res.json({ message: "Registration successful!", user })
	} catch (error) {
		res.status(500).json({ message: "Error registering user", error })
	}
}

exports.login = async (req, res) => {
	try {
		const user = await User.findOne({ where: { email: req.body.email } })
		if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
			return res.status(400).json({ message: "Email or password is incorrect" })
		}

		// Create a JWT token
		const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" })

		res.json({ message: "Login successful!", token })
	} catch (error) {
		res.status(500).json({ message: "Error logging in", error })
	}
}
