import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export const app = express();

app.use(
  cors({
    origin:"*",
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));

app.use(cookieParser());

// Importing Routes
import { authRouter } from "./routes/auth/auth.route";
import { API_PREFIX } from "./constant";
import { errorHandler } from "./middlewares/error.middleware";
import { taskRouter } from "./routes/task-management/task.routes";

// Using Routes
app.use(`${API_PREFIX}/auth`, authRouter);

// task management
app.use(`${API_PREFIX}/tasks`,taskRouter)

const frontendPath = path.join(process.cwd(), "frontend/dist");

// Serve frontend in production
if (process.env.NODE_ENV !== "test") {
  // Serve React build if it exists
  app.use(express.static(frontendPath));

  app.get(/(.*)/, (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  // For tests only
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Server is running in test mode" });
  });
}

// Handle undefined API routes
app.use("/api/:unmatchedRoute", (req: Request, res: Response) => {
  res.status(404).json({ 
    error: `API route not found: /api/${req.params.unmatchedRoute}` 
  });
});

// Error Handling Middleware
app.use(errorHandler);