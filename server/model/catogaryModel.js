
import { DataTypes } from "sequelize";
import { sequelize } from "../config/DbConnection.js";

const Category = sequelize.define("categories", {
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true,
    freezeTableName: true
});

export default Category;
