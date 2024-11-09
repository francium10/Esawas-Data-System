import express from "express";
import {
  authUser,
  registerUser,
  getUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", authUser);
router.post("/", registerUser);
router.get("/", getUsers);

export default router;
