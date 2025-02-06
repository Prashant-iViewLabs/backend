const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { username, password } = req.body;

  // Dummy user authentication (replace with real user validation)
  if (username !== "admin" || password !== "password") {
    return res.status(403).json({ error: "Invalid credentials" });
  }

  // User payload (store relevant user details)
  const user = { username };

  // Generate JWT token (expires in 1 hour)
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  res.json({ accessToken });
};

module.exports = { login };
