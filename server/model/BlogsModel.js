// models/Blog.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/DbConnection.js";
import User from "./userModel.js";
import Category from "./catogaryModel.js";

const Blog = sequelize.define("blogs", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: "id"
        }

    },
    images: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('images');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('images', JSON.stringify(value));
        }
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: true,
    freezeTableName: true
});

// Define association
Blog.belongsTo(User, { foreignKey: 'userId' });
Blog.belongsTo(Category, { foreignKey: "categoryId" })

export default Blog;
