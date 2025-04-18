import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
// In src/app.ts or db.config.ts (wherever Sequelize is initialized)
//import sequelize from './config/db.config';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false, 
  }
);

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Failed to sync DB:", err);
});

export default sequelize;

