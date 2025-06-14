import { col, fn, Op, where } from "sequelize";
import Category from "../model/catogaryModel.js"
import errorHandler from "../utils/errorHandler.js";
import successHandler from "../utils/successHandler.js";

//  Category's  - admin 

//  register categories - 
export const createCategoary = async (req, res, next) => {
    const { category } = req.body;
    console.log(req.body);
    if (!category || category?.trim() === "") {
        return next(new errorHandler(400, "category value required"))
    }
    const findCategory = await Category.findOne({ where: { category } });
    if (findCategory) {
        return next(new errorHandler(400, "category already Existed"))
    }
    const data = await Category.create({ category })

    return new successHandler(201, "Category Created", data).send(res)
};

// find all categries -  
export const getCategories = async (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const keyword = req.query.keyword || "";
    const resultPerPage = 15;
    const offset = (currentPage - 1) * resultPerPage;

    // where() function ||  where(...) should take two arguments: where(expression, comparisonObject)
    const categoryCount = await Category.count();

    const data = await Category.findAll(
        {
            where: where(fn("LOWER", col("category")), { [Op.like]: `%${keyword.toLowerCase()}%` }),
            order: [["id", "DESC"]], limit: resultPerPage, offset
        }); // desending order - newest first - 
    if (!data) {
        return next(new errorHandler(404, "categories not found"));
    }
    return new successHandler(200, "Categories Found", { data, categoryCount, resultPerPage }).send(res);
};

// find single categries -  
export const getCategory = async (req, res, next) => {
    const { id } = req.params;
    const data = await Category.findByPk(id)

    if (!data) {
        return next(new errorHandler(404, "category not found"));
    }
    return new successHandler(200, "Category Found", data).send(res);
};

// update Categories - 
export const updateCategories = async (req, res, next) => {
    const { category } = req.body;
    const data = await Category.findByPk(req.params.id);
    if (!data) {
        return next(new errorHandler(404, "categories not found"));
    }

    data.category = category;
    const user = await data.save();

    return new successHandler(200, "updated SuccessFully", user).send(res);

};

//  delete Categories - 
export const deleteCategories = async (req, res, next) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
        return next(new errorHandler(404, "categories not found"));
    }
    const data = await category.destroy();
    return new successHandler(200, "deleted SuccessFully", data).send(res);
};
