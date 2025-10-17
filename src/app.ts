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

app.get("/", (req: Request, res: Response) => {
  res.send("API is running....");
});

// Using Routes
app.use(`${API_PREFIX}/auth`, authRouter);

// task management
app.use(`${API_PREFIX}/tasks`,taskRouter)

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from frontend/dist
   const frontendPath = path.join(process.cwd(), "frontend/dist");
  
  app.use(express.static(frontendPath));
  
  // Handle all GET requests that aren't for the API
 app.get(/(.*)/, (req: Request, res: Response, next: NextFunction) => {
  // Skip API routes
  if (req.path.startsWith("/api")) {
    return next();
  }
  console.log("Serving index.html for route:", req.url);
  res.sendFile(path.join(frontendPath, "index.html"));
});
} else {
  // In development
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Server is running in development mode" });
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