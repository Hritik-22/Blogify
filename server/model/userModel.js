import { DataTypes } from "sequelize";
import { sequelize } from "../config/DbConnection.js";

const User = sequelize.define("user", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user"
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    otpExpiry: {
        type: DataTypes.DATE,
        allowNull: true
    }

},
    {
        timestamps: true,
        tableName: "users"
    })
export default User;