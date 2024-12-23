import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Configure Sequelize with correct credentials
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT, // Explicitly specify the port
});

// Export the Sequelize instance
export default sequelize;

// Optional: Test the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
