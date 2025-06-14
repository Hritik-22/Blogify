import User from "../model/userModel.js";
import Contact from "../model/contactModel.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/errorHandler.js";
import { col, fn, Op, where } from "sequelize";
import { authToken, options } from "../utils/authToken.js";
import successHandler from "../utils/successHandler.js";
import { sendOtpToClient } from "../helpers/otpSender.js";
const salt = 10;

// Create User - 
export const registerUser = async (req, res, next) => {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const data = await User.create(req.body);

    return new successHandler(201, "successFully Created", data).send(res);
}

// user Profile - 
export const userProfile = async (req, res, next) => {
    const { id } = req.user;
    const data = await User.findByPk(id); //findByPk === findById || pk is primary key- 
    if (!data) {
        return next(new errorHandler(404, "user not found"))
    }
    return new successHandler(200, "user found", data).send(res);
}

// update Profile - 
export const updateUser = async (req, res, next) => {
    console.log(req.body)
    const { id } = req.user;
    const updates = req.body;
    const user = await User.findByPk(id);
    if (!user) {
        return next(new errorHandler(404, "user not found"))
    }
    const data = await user.update(updates);
    return new successHandler(200, "updated successFully ", data).send(res);
};

// delete user - 
export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        return next(new errorHandler(404, "user not found"))
    }
    const data = await user.destroy();
    return new successHandler(201, "deleted successfully", data).send(res);
};

//  Login user  - 
export const login = async (req, res, next) => {
    const { user, password } = req.body;
    const data = await User.findOne({ where: { [Op.or]: [{ email: user }, { phone: user }, { userName: user }] } })
    if (!data || data.length === 0) {
        return next(new errorHandler(404, "user not found"))
    }
    const verifyPassword = await bcrypt.compare(password, data.password)

    if (!verifyPassword) {
        return next(new errorHandler(400, "user and password not found"))
    }

    const token = authToken({ user: data.id })
    res.cookie("authToken", token, options());
    return new successHandler(200, "login successfully", data).send(res);

};

// Logout user - 
export const logout = (req, res, next) => {

    res.clearCookie("authToken");
    return new successHandler(200, "logged-out sucessfully").send(res);
}

// change password using old password -
export const updatePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (oldPassword === newPassword) {
        return next(new errorHandler(400, "Old password and new password should not be the same"));
    }
    const { id } = req.user;
    const data = await User.findByPk(id);
    if (data.length === 0) {
        return next(new errorHandler(400, "user not found"));
    }
    const isMatchPassword = await bcrypt.compare(oldPassword, data.password);
    if (!isMatchPassword) {
        return next(new errorHandler(403, "your old password is wrong"));
    }

    const password = await bcrypt.hash(newPassword, salt)
    data.password = password;
    await data.save()
    return new successHandler(200, "Updated successfully successfully").send(res);
}



// contact user - 
export const contactSupport = async (req, res, next) => {

    const { name, phone, message } = req.body;

    if (!name || !phone || !message || phone.length !== 10) {
        return next(new errorHandler(400, "All fields are required and contact number should be exactly 10 digits"))
    }
    const data = await Contact.create({ name, phone, message });

    if (!data) { return next(new errorHandler(400, "Data could not be inserted into the database")) };

    return new successHandler(200, "Request submitted. Our team will contact you shortly.").send(res);
}

// ===========================================    Admin Routes ======================================================  

// view List from users  - admin

export const supportList = async (req, res, next) => {
    const resultPerPage = 10;
    const currentPage = req.query.page || 1;
    const keyword = req.query.keyword || "";
    const offset = (currentPage - 1) * resultPerPage;
    const queryCount = await Contact.count();
    const data = await Contact.findAll({
        where: {
            [Op.or]: [
                where(fn("LOWER", col("name")), {
                    [Op.like]: `%${keyword.toLowerCase()}%`
                }),
                where(fn("LOWER", col("phone")), {
                    [Op.like]: `%${keyword.toLowerCase()}%`
                })
            ]
        },
        limit: resultPerPage,
        offset,
        order: [["id", "DESC"]]
    });
    if (!data) {
        return next(new errorHandler(404, "Data Not Found"))
    }
    return new successHandler(200, "querys Found", { queryCount, data, resultPerPage }).send(res)
}
// get singal data for update  - admin
export const getsingleSupportData = async (req, res, next) => {
    const { id } = req.params;
    const data = await Contact.findByPk(id);
    if (!data) {
        return next(new errorHandler(404, "support query not found"))
    }
    return new successHandler(200, "data found", data).send(res);

}

//  Update after Contact - admin
export const updateSupport = async (req, res, next) => {
    const { id } = req.params;
    const formData = req.body;
    const query = await Contact.findByPk(id);
    if (!query) {
        return next(new errorHandler(404, " Query Data Not Found"))
    }
    const data = await query.update(formData);
    return new successHandler(200, "updated successFully ", data).send(res);
};

// get users - admin route

export const getUsers = async (req, res, next) => {

    const resultPerPage = 10;
    const currentPage = req.query.page || 1;
    const keyword = req.query.keyword || "";
    console.log(currentPage)
    const offset = (currentPage - 1) * resultPerPage;

    const searchConditions = keyword
        ? {
            [Op.or]: [
                where(fn("LOWER", col("userName")), {
                    [Op.like]: `%${keyword.toLowerCase()}%`
                }),
                where(fn("LOWER", col("email")), {
                    [Op.like]: `%${keyword.toLowerCase()}%`
                }),
                where(fn("LOWER", col("Phone")), {
                    [Op.like]: `%${keyword.toLowerCase()}%`
                }),
                where(fn("LOWER", col("firstName")), {
                    [Op.like]: `%${keyword.toLowerCase()}%`
                }),
                where(fn("LOWER", col("lastName")), {
                    [Op.like]: `%${keyword.toLowerCase()}%`
                })
            ]
        }
        : {};

    const userCount = await User.count({ where: searchConditions });

    const data = await User.findAll({
        where: searchConditions,
        limit: resultPerPage,
        offset,
        order: [["id", "DESC"]],
    });

    if (!data || data.length === 0) {
        return next(new errorHandler(404, "Data not found"));
    }

    return new successHandler(200, "Data fetched", {
        data,
        userCount,
        resultPerPage,
        currentPage: Number(currentPage)
    }).send(res);
}

// get single user - admin route
export const getUser = async (req, res, next) => {
    const { id } = req.params;
    const data = await User.findByPk(id); //findByPk === findById || pk is primary key- 
    if (!data) {
        return next(new errorHandler(404, "user not found"))
    }
    return res.status(200).json({ success: true, statusCode: 200, message: "data fatched", users: data });
}

// Update user Profile and role - 
export const updateRole = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByPk(id);
    if (!user) {
        return next(new errorHandler(404, "Contact not Updated"))
    }
    const data = await user.update(updates);
    return new successHandler(200, "updated successFully ", data).send(res);
};







//forget Password -  Pending*

// Genrate Otp - 

export const GenrateOtp = async (req, res, next) => {
    const { phone } = req.body;

    if (!phone) {
        return next(new errorHandler(400, "Phone Number is required"));
    }

    const user = await User.findOne({ where: { phone } });
    if (!user) {
        return next(new errorHandler(404, "user not found please enter a registerd number "))
    }

    const otp = Math.floor(100000 + Math.random(6) * 999999)

    if (otp) {
        user.otp = otp;
        user.otpExpiry = Date.now();
        sendOtpToClient(otp, phone)
    }


    await user.save();
    return new successHandler(200, `otp genrated SuccessFully`, null).send(res);
};

//  Verify Otp -
export const verifyOtp = async (req, res, next) => {
    const { otp, phone } = req.body;

    if (!phone || !otp) {
        return next(new errorHandler(400, "Phone and OTP are required"));
    }

    const user = await User.findOne({ where: { phone } });

    if (!user || user.otp !== Number(otp)) {
        return next(new errorHandler(400, "Invalid OTP Or Expired Otp"));
    }

    const currentTime = Date.now();
    const otpExpiryTime = new Date(user.otpExpiry).getTime();

    const diffInMs = currentTime - otpExpiryTime;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes > 2) {
        return new errorHandler(400, "OTP expired. Generate a new one and verify within 2 minutes.").send(res);
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return new successHandler(200, "OTP verified successfully", null).send(res);
};

export const forgetPassword = async (req, res, next) => {
    const { phone, password, confirmPassword } = req.body;

    if (!phone || !password || !confirmPassword) {
        return next(new errorHandler("password and confirm password required"))
    };

    if (password !== confirmPassword) {
        return next(new errorHandler("password and confirm password must be the same"))
    };

    const user = await User.findOne({ phone });
    if (!user) {
        return next(new errorHandler("user's profile not found"))
    };

    const hashpassword = await bcrypt.hash(password, salt);

    if (hashpassword) {
        user.password = hashpassword
    }
    await user.save();

    return new successHandler(200, "your password reset SuccessFully", null).send(res);

};
