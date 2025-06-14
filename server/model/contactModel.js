import { DataTypes } from "sequelize";
import { sequelize } from "../config/DbConnection.js";

const Contact = sequelize.define("contact", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("pending", "resolved"),
        defaultValue: "pending",
        allowNull: false,
    },
    remark: {
        type: DataTypes.STRING,
        defaultValue: "Not resolved",
        allowNull: false,
    }

}, {
    timestamps: true,
    freezeTableName: true
});

export default Contact;
