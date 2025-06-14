import {
    deleteUser, getUser, getUsers, login, logout, registerUser, updatePassword, updateUser, userProfile,
    contactSupport,
    updateRole,
    supportList,
    updateSupport,
    getsingleSupportData,
    GenrateOtp,
    verifyOtp,
    forgetPassword,

} from "../controller/userController.js";
import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";   // handle Try catch block - Not reapiting the code - 
import { authorisedRoles, isAuthenticated } from "../middleware/authentication.js";


const router = express.Router();

router.route("/register").post(asyncHandler(registerUser))
router.route("/user/me").get(isAuthenticated, asyncHandler(userProfile));
router.route("/user").put(isAuthenticated, asyncHandler(updateUser));
router.route("/user/:id").delete(isAuthenticated, asyncHandler(deleteUser));

// auth routes - 
router.route("/login").post(asyncHandler(login));
router.route("/logout").post(isAuthenticated, asyncHandler(logout));
router.route("/password/change").put(isAuthenticated, asyncHandler(updatePassword));
router.route("/contact").post(asyncHandler(contactSupport))

// Forget Password - 
router.route("/genrate/otp").post(asyncHandler(GenrateOtp));
router.route("/verify/otp").post(asyncHandler(verifyOtp));
router.route("/forget/password").post(asyncHandler(forgetPassword));


// admin routes - 
router.route("/contact").get(isAuthenticated, authorisedRoles("admin"), asyncHandler(supportList));
router.route("/contact/:id").get(isAuthenticated, authorisedRoles("admin"), asyncHandler(getsingleSupportData));
router.route("/contact/:id").patch(isAuthenticated, authorisedRoles("admin"), asyncHandler(updateSupport));

router.route("/users").get(isAuthenticated, authorisedRoles("admin"), asyncHandler(getUsers));
router.route("/user/:id").get(isAuthenticated, authorisedRoles("admin"), asyncHandler(getUser));
router.route("/user/:id").patch(isAuthenticated, authorisedRoles("admin"), asyncHandler(updateRole));




export default router;