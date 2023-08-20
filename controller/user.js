const bcrypt = require("bcrypt");
const User = require("./user");

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      created_at: new Date(),
    });

    // Store user id in the session for login
    req.session.userId = user.id;

    res.json({ message: "Registration successful!", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    // Store user id in the session for persistence
    req.session.userId = user.id;

    res.json({ message: "Login successful!", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }

    res.json({ message: "Logout successful!" });
  });
};
