import express from "express";
import { register, adminLogin, logout,getAllComments, getAllBlogsAdmin, deleteCommentById, approveCommentById, getDashboard, getMe } from "../controllers/controllers.js";
import { auth } from '../middlewares/auth.js'
const router = express.Router();

router.post("/register", register);
router.post("/login", adminLogin);

router.post("/logout",logout);
router.get("/comments", auth,  getAllComments)
router.get("/me", auth, getMe);
router.get("/blogs", auth, getAllBlogsAdmin)
router.post("/delete-comment", auth, deleteCommentById)
router.post("/approve-comment", auth, approveCommentById)
router.post("/dashboard", auth, getDashboard)

export default router;
