import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import User from "../models/user.js";

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
    });

    const token = generateAccessToken(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Registered & logged in",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Wrong password" });

    const token = generateAccessToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
};

export const getAllBlogsAdmin = async(req, res) =>{
  try {
    const userId = req.user.id;
    const blogs = await Blog.find({user: userId}).populate("user").sort({createdAt: -1});
    res.json({success: true, blogs})
  } catch (error){
    res.json({success: false, message: error.message})
  }
}

export const getAllComments = async (req, res) =>{
  try{
    const comments = await Comment.find({}).populate("blog").sort({createdAt: -1})
    res.json({success: true, comments})
  } catch (error){
      res.json ({success: false, message: error.message})
  }
}

export const getDashboard = async (req, res) =>{
  try{
      const userId = req.user.id;
      const recentBlogs = await Blog.find({user: userId}).populate("user").sort({createdAt:-1}).limit(5);
      const blogs = await Blog.countDocuments();
      const comments = await Comment.countDocuments();
      const drafts = await Blog.countDocuments({isPublished: false})

      const dashboardData = {
        blogs, comments, drafts, recentBlogs
      }
      res.json({success: true, dashboardData})
  } catch (error){
      res.json({success: false, message: error.message})
  }
}

export const deleteCommentById = async (req, res) =>{
  try{
      const {id} = req.body;
      await Comment.findByIdAndDelete(id);
      res.json({success: true, message:"Comment deleted successfully"})
  } catch (error) {
      res.json({success: false, message: error.message})
  }
}

export const approveCommentById = async (req, res) =>{
  try{
      const {id} = req.body;
      await Comment.findByIdAndUpdate(id, {isApproved: true});
      res.json({success: true, message:"Comment approved successfully"})
  } catch (error) {
      res.json({success: false, message: error.message})
  }
}

export const getMe = (req, res) => {
  res.json({
    success: true,
    userId: req.user.id,
  });
};
