import dotenv from "dotenv"
dotenv.config();
// config/DbConnection.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_URL, {

    dialect: 'mysql',
    logging: false,
});

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('mySql DB Connection has been established successfully');
    } catch (error) {
        console.error('Connection error:', error);
    }
};

export { sequelize, connectDb };
