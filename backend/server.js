import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 8000;
dotenv.config();

connectDB();

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser Middleware
app.use(cookieParser());

app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is running");
});

//Routes
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
