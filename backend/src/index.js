import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import fs from "fs";
import cron from "node-cron";

import { initializeSocket } from "./lib/socket.js";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/songs.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stats.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const _dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// Set up morgan to log requests in a simple format
app.use(morgan("dev")); // 'dev' gives a concise colored log

app.use(express.json()); // to parse req.body
app.use(clerkMiddleware()); // this will add auth to req obj => req.auth
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(_dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, //file size 10 mb
    },
  })
);

// cron jobs=>deletes file from temp folder ever hour
const tempDir = path.join(process.cwd(), "tmp");//current directory to temp directory  location is in temp directory
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});


app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes); //authentication route
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

//for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../frontend/dist")));
  app.get("*", (req, res) => {//fora ny other route go to this folder and form there take index .html
    res.sendFile(path.resolve(_dirname, "../frontend", "dist", "index.html"));
  });
}

//error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

httpServer.listen(PORT, () => {
  console.log("app is listening at PORT  " + PORT);
  connectDB();
});

//socket.io
