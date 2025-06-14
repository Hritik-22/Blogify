import Blog from "../model/BlogsModel.js";
import Category from "../model/catogaryModel.js";
import User from "../model/userModel.js";
import cloudinary from "../utils/cloudnary.js";
import errorHandler from "../utils/errorHandler.js";
import successHandler from "../utils/successHandler.js";
import { nodeCache } from "../app.js";
import { streamUploadFromBuffer } from "../utils/imageUploader.js";
import { Op, fn, col, where } from "sequelize";



// Create - Blog ;
export const createBlog = async (req, res, next) => {
    const { title, content, categoryId } = req.body;
    if (!req.file) {
        return next(new errorHandler(400, "image are required"));
    }
    const { secure_url, public_id } = await streamUploadFromBuffer(req.file.buffer)

    const userId = req.user?.id;
    if (!title || !content || !categoryId || !userId) {
        return next(new errorHandler(400, "All fields are required including image and user."));
    }
    const data = await Blog.create({
        title, content, categoryId, userId,
        images: {
            publicId: public_id,
            publicUrl: secure_url
        }

    });
    nodeCache.del("data")

    if (!data) {
        return next(new errorHandler(500, "Blog creation failed."));
    }

    return new successHandler(201, "Blog created successfully", data).send(res);

};

// View Blogs with Search, Pagination, and Caching
export const viewBlogs = async (req, res, next) => {

    const currentPage = parseInt(req.query.page) || 1;
    const resultPerPage = 15;
    const keyword = req.query.keyword || "";
    const offset = (currentPage - 1) * resultPerPage;

    // Create unique cache key
    const cacheKey = `blogs-page-${currentPage}-keyword-${keyword.toLowerCase()}`;

    // Try to load from cache
    if (nodeCache.has(cacheKey)) {
        const data = JSON.parse(nodeCache.get(cacheKey));
        return new successHandler(200, "blogs found (from cache)", data).send(res);
    }

    // Count total matching blogs
    const blogCount = await Blog.count({
        where: where(fn("LOWER", col("title")), {
            [Op.like]: `%${keyword.toLowerCase()}%`
        })
    });

    // Get paginated blogs
    const blogs = await Blog.findAll({
        where: where(fn("LOWER", col("title")), {
            [Op.like]: `%${keyword.toLowerCase()}%`
        }),
        include: [
            { model: Category, as: "category", attributes: ["id", "category"] },
            { model: User, as: "user", attributes: { exclude: ["password"] } }
        ],
        order: [["id", "DESC"]],
        limit: resultPerPage,
        offset
    });

    const data = {
        blogs,
        blogCount,
        resultPerPage,
        currentPage,
        totalPages: Math.ceil(blogCount / resultPerPage)
    };

    // Store in cache (for 5 minutes)
    nodeCache.set(cacheKey, JSON.stringify(data), 60 * 5);

    if (!blogs || blogs.length === 0) {
        return next(new errorHandler(404, "blogs not found"));
    }
    return new successHandler(200, "blogs found", data).send(res);
};

// get single blog ; 
export const viewBlog = async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findByPk(id, {
        include: [
            { model: Category, as: "category", attributes: ["id", "category"] },
            { model: User, as: "user", attributes: { exclude: ["password"] } }
        ]
    });
    if (!blog) {
        return next(new errorHandler(404, "blog Not Found"))
    }

    const suggestedBlogs = await Blog.findAll({
        where: { categoryId: blog.categoryId },
        order: [["id", "DESC"]],
        include: [
            { model: User, as: "user", attributes: { exclude: ["password"] } },
            { model: Category, as: "category" }
        ]
    })


    const data = { blog, suggestedBlogs }

    return new successHandler(200, "blog found", data).send(res);
};

// Update blog - 
export const updateBlog = async (req, res, next) => {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
        return res.status(404).json({ success: false, message: "Blog not found" });
    };
    if (req.file && req.file.buffer) {
        // Delete old image from Cloudinary
        await cloudinary.uploader.destroy({ public_id: blog.images.publicId });
        const { secure_url, public_id } = await streamUploadFromBuffer(req.file.buffer)

        if (!secure_url && !public_id) {
            return next(new errorHandler(400, "Unable to upload image, please try again later"));
        }
        req.body.images = { publicId: public_id, publicUrl: secure_url };
    }

    const updatedBlog = await blog.update(req.body);
    nodeCache.del("data");
    if (!updateBlog) {
        return next(new errorHandler(400, "Unable to update Blog"));
    }
    return new successHandler(200, "Blog updated successfully", updatedBlog).send(res);
};

// delete blog - 
export const deleteBlog = async (req, res, next) => {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);
    if (!blog) {
        return next(new errorHandler(404, "Blog not found"));
    };

    const publicId = JSON.parse(blog.images)?.publicId;
    if (publicId) {
        await cloudinary.uploader.destroy(publicId);
    }
    const data = await blog.destroy();
    nodeCache.del("data");


    return new successHandler(200, "Blog deleted successfully", data).send(res);
};

// view - Blogs -
export const myBlogs = async (req, res, next) => {
    const data = await Blog.findAll({ where: { userId: req.user.id }, order: [["id", "DESC"]] });

    if (!data || data.length === 0) {
        return next(new errorHandler(404, "blogs not found"));
    }

    return new successHandler(200, "blogs found", data).send(res);
};

