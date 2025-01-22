import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    req.userId = decoded.userId;
  } catch (error) {
    console.log("Error in verifyToken middleware", error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  next();
};
