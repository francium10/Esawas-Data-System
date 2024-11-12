import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allows cookies to be sent
};

app.use(cors(corsOptions));

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Routes
app.use("/api/users", userRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
