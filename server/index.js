import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use(cors());
// app.use(
// 	cors({
// 		origin: "http://localhost:3000",
// 		methods: ["GET", "POST", "PUT", "DELETE"],
// 		allowedHeaders: ["Content-Type"],
// 	})
// );

app.use("/", bookRoute);

app.get("/", (req, res) => {
	console.log(req);
	return res.status(234).send("Welcome to Book Store");
});

mongoose
	.connect(mongodbURL)
	.then(() => {
		console.log("MongoDB connected");
		app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
	})
	.catch((err) => console.log(err));
