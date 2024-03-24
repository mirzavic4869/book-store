import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const DeleteBook = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();

	const handleDelete = (e) => {
		e.preventDefault();
		setLoading(true);
		axios
			.delete(`http://localhost:3001/book/${id}`)
			.then(() => {
				setLoading(false);
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="my-4 text-3xl">Delete Book</h1>
			{loading ? <Spinner /> : ""}
			<div className="flex flex-col p-4 mx-auto rounded-xl border-2 border-sky-400 w-[600px]">
				<h3>Are you sure delete this book?</h3>
				<button className="p-2 m-8 text-white bg-red-600 rounded-md" onClick={handleDelete}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default DeleteBook;
