const jwt = require('jsonwebtoken');
const JWT_SECRET = "hkjjcbcja";

module.exports = async function(req, res, next) {
  // Get the user from the jwt token and add id to req object
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    if (!data || !data.user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
}
