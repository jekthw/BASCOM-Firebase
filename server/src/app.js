import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";   
import cors from "cors"; 
import { routerv1 } from "./routes/index.js";
import { verifyApiKey } from "./middleware/authApiKey.middleware.js";
import { authMiddleware } from "./middleware/authToken.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route for testing
app.use("/", verifyApiKey, routerv1);

app.get("/api/v1/protected", verifyApiKey, authMiddleware, (req, res) => {
  console.log(req.apiKey);
  res.json({
    message: "You have accessed a protected route",
    user: req.user
  });
});

// Middleware for handling 404 errors
app.use((req, res, next) => {
      res.status(404).json({
      error: 'Not Found',
      message: 'The requested resource was not found.'
    });
});

export default app;
