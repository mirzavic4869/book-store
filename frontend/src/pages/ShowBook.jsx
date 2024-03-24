import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ShowBook = () => {
	const { id } = useParams();
	const [book, setBook] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://localhost:3001/book/${id}`)
			.then((response) => {
				setBook(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [id]);

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="my-8 text-3xl font-bold">Show Book</h1>
			{loading ? (
				<Spinner />
			) : (
				<div className="flex flex-col p-4 border-2 border-sky-400 w-fit">
					<div className="my-4">
						<span className="mr-4 text-xl text-gray-500">Id</span>
						<span>{book._id}</span>
					</div>
					<div className="my-4">
						<span className="mr-4 text-xl text-gray-500">Title</span>
						<span>{book.title}</span>
					</div>
					<div className="my-4">
						<span className="mr-4 text-xl text-gray-500">Author</span>
						<span>{book.author}</span>
					</div>
					<div className="my-4">
						<span className="mr-4 text-xl text-gray-500">Publish Year</span>
						<span>{book.publishYear}</span>
					</div>
					<div className="my-4">
						<span className="mr-4 text-xl text-gray-500">Create Time</span>
						<span>{new Date(book.CreatedAt).toString()}</span>
					</div>
					<div className="my-4">
						<span className="mr-4 text-xl text-gray-500">Last Update Time</span>
						<span>{new Date(book.updatedAt).toString()}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShowBook;
