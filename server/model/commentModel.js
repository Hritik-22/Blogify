// models/Comment.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/DbConnection.js";

const Comment = sequelize.define("comment", {

    blogId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'blogs',
            key: 'id'
        },
        allowNull: false
    },
    commentedUser: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    commented_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default Comment;
