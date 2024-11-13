import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUser);

export default router;
