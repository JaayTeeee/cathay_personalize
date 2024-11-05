import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from './routes/users.routes.js';

dotenv.config();

const app = express();

// ...

const start = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_URI
    );
    console.log("Database connected!!!!");

    app.use("/users", usersRouter);
    
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();