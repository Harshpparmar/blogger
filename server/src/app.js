import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

const app = express();

// cors
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
}))

// rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes"
})

app.use(limiter);

app.use(
    express.json({ limit: '16kb' })
);

app.use(express.urlencoded(
    { extended: true, limit: "16kb" }
));
app.use(
    express.static("public")
);
app.use(cookieParser());

import authRouter from "./routes/auth.routes.js";
import postsRouter from "./routes/posts.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/healthcheck", healthcheckRouter);

app.get("/", (req, res) => {
    res.send("Blog Server is running!");
});

export default app;