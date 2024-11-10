import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  getUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/").post(registerUser).get(getUsers);
router.post("/logout", logoutUser);
router.get("/profile", getUserProfile);

export default router;
