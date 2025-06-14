import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";   // handle Try catch block - Not reapiting the code - 
import { authorisedRoles, isAuthenticated } from "../middleware/authentication.js";
import { createCategoary, deleteCategories, getCategories, getCategory, updateCategories, } from "../controller/adminController.js";
import { createBlog, deleteBlog, myBlogs, updateBlog, viewBlog, viewBlogs } from "../controller/blogController.js";
import upload from "../middleware/multer.js";


// categories routes for admin dash -  
router.route("/admin/category").get(isAuthenticated, asyncHandler(getCategories));
router.route("/admin/category/:id").get(isAuthenticated, asyncHandler(getCategory));

router.route("/admin/category").post(isAuthenticated, authorisedRoles("admin"), asyncHandler(createCategoary));
router.route("/admin/category/:id").put(isAuthenticated, authorisedRoles("admin"), asyncHandler(updateCategories));
router.route("/admin/category/:id").delete(isAuthenticated, authorisedRoles("admin"), asyncHandler(deleteCategories));

//  Protected  Routes -

router.route("/blogs").post(isAuthenticated, upload.single("image"), asyncHandler(createBlog));
router.route("/blog/:id").put(isAuthenticated, upload.single("image"), asyncHandler(updateBlog));
router.route("/blog/:id").delete(isAuthenticated, asyncHandler(deleteBlog));
router.route("/my-blog").get(isAuthenticated, asyncHandler(myBlogs));


// everyOne can see the blogs --

router.route("/view-blogs").get(asyncHandler(viewBlogs));
router.route("/view-blog/:id").get(asyncHandler(viewBlog));


export default router;