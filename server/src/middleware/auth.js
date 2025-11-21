import jwt from "jsonwebtoken";

// Middleware function to check for a valid JWT in the request header
const authMiddleware = (req, res, next) => {
  // 1. Get token from the header
  // Headers often look like: Authorization: Bearer <token>
  const authHeader = req.header("Authorization");

  // Check if header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Extract the token part (slice off 'Bearer ')
  const token = authHeader.split(" ")[1];

  // 2. Verify token
  try {
    // Replace "your_default_secret" with the actual secret used to sign the token
    const secret = process.env.JWT_SECRET || "your_default_secret";

    // Decodes the token using the secret key
    const decoded = jwt.verify(token, secret);

    // Attach the user information (userId) from the token payload to the request
    req.user = decoded;

    next(); // Move on to the next handler (the profile route controller)
  } catch (err) {
    // This catches expired tokens, invalid signatures, etc.
    console.error("JWT Verification Error:", err.message);
    res.status(401).json({ message: "Token is not valid or has expired" });
  }
};

export default authMiddleware;
