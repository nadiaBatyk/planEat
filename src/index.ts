import express from 'express';
import * as dotenv from 'dotenv';
import { sequelize } from './db/db';
import mealRoutes from './routes/mealRoutes';

dotenv.config();
const app = express();

const PORT = process.env.PORT;

async function main(): Promise<void> {
  // MIDDLEWARES
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ROUTES
  app.use(mealRoutes);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Succesfully connected to port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    app.on('error', err => console.log(`Error on server: ${err}`));
  }
}

void main();
