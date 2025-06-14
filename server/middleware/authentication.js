import asyncHandler from "./asyncHandler.js";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken"
import errorHandler from "../utils/errorHandler.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return next(new errorHandler(401, "Please Login First"));
    };


    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findByPk(decodedData.user);

    next();

});


const authorisedRoles = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new errorHandler(403, "You are not authorized to access this resource"));
        }
        next()
    }
}


export { isAuthenticated, authorisedRoles }