import express from 'express'
import cors from "cors"
import userRoutes from "./routes/user.js"
import cookieParser from "cookie-parser"
import blogRouter from './routes/blogRoutes.js';


const app = express();

app.use(cors({
  origin: "http://localhost:5173",   // explicitly allow your frontend
  credentials: true                  // allow cookies/headers
}));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Api is Working");
});

app.use('/admin',userRoutes);
app.use('/blog',blogRouter)

export default app;