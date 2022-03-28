const admin = require("firebase-admin");

// retrieve token from header and verify that an authorized user is
// applying CRUD operations
const validateToken = async (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    res.status(401).json({ success: false, message: "Missing ID token." });
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ success: false, message: error });
  }
};

module.exports = {
  validateToken,
};
