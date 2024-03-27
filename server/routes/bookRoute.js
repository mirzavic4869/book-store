import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/book", async (req, res) => {
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

router.get("/books", async (req, res) => {
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

router.get("/book/:id", async (req, res) => {
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

router.put("/book/:id", async (req, res) => {
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

router.delete("/book/:id", async (req, res) => {
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

export default router;
