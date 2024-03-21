import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
	console.log(req);
	return res.status(234).send("Welcome to Book Store");
});

app.post("/book", async (req, res) => {
	try {
		if (!req.body.title || !req.body.author || !req.body.publishYear) {
			return res.status(400).send({ message: "All fields are required" });
		}

		const newBook = {
			title: req.body.title,
			author: req.body.author,
			publishYear: req.body.publishYear,
		};

		const book = await Book.create(newBook);
		return res.status(201).send(book);
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

app.get("/books", async (req, res) => {
	try {
		const books = await Book.find({});
		return res.status(200).json({
			count: books.length,
			data: books,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

app.get("/book/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) {
			return res.status(400).send({ message: "Book not found" });
		}
		return res.status(200).json(book);
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

app.put("/book/:id", async (req, res) => {
	try {
		if (!req.body.title || !req.body.author || !req.body.publishYear) {
			return res.status(400).send({ message: "All fields are required" });
		}

		const book = await Book.findByIdAndUpdate(req.params.id, req.body);

		if (!book) {
			return res.status(404).send({ message: "Book not found" });
		}

		return res.status(200).json({
			message: "Book updated successfully",
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

app.delete("/book/:id", async (req, res) => {
	try {
		const book = await Book.findByIdAndDelete(req.params.id);
		if (!book) {
			return res.status(404).send({ message: "Book not found" });
		}
		return res.status(200).json({
			message: "Book deleted successfully",
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

mongoose
	.connect(mongodbURL)
	.then(() => {
		console.log("MongoDB connected");
		app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
	})
	.catch((err) => console.log(err));
