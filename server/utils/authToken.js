import jwt from "jsonwebtoken";

//  genrate Token - 
const authToken = (user) => {
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
    return token;
};


// cookies options - 
const options = () => {
    return {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000,
    };
};


export { authToken, options }