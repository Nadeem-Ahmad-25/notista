const jwt = require("jsonwebtoken");
const SECRET_KEY = "My$ecret#ey";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  
  if (!token) {
   return res.status(401).send({ error: "Invalid token appended " });
  }
  try {
    const data = jwt.verify(token, SECRET_KEY);
    req.user = data.user;
    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid token appended " });
  }
};

module.exports = fetchuser;
