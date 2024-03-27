import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
	const [state, setState] = useState({ title: "", author: "", publishYear: "" });
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			title: state.title,
			author: state.author,
			publishYear: state.publishYear,
		};
		setLoading(true);
		axios
			.post("http://localhost:3001/book", data)
			.then((response) => {
				setLoading(false);
				setState(response.data);
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
			<h1 className="my-4 text-3xl font-bold">Create Book</h1>
			<div className="flex justify-center">{loading ? <Spinner /> : ""}</div>
			<div className="flex flex-col p-4 mx-auto rounded-xl bg-white shadow-lg md:w-[600px]">
				<div className="p-4">
					<label htmlFor="title" className="mr-4 text-gray-400 md:text-lg">
						Title
					</label>
					<input type="text" id="title" value={state.title} onChange={(e) => setState({ ...state, title: e.target.value })} className="w-full px-4 py-2 border-2 border-gray-400 rounded-md" />
				</div>
				<div className="p-4">
					<label htmlFor="author" className="mr-4 text-gray-400 md:text-lg">
						Author
					</label>
					<input type="text" id="author" value={state.author} onChange={(e) => setState({ ...state, author: e.target.value })} className="w-full px-4 py-2 border-2 border-gray-400 rounded-md" />
				</div>
				<div className="p-4">
					<label htmlFor="publishYear" className="mr-4 text-gray-400 md:text-lg">
						Publish Year
					</label>
					<input type="text" id="publishYear" value={state.publishYear} onChange={(e) => setState({ ...state, publishYear: e.target.value })} className="w-full px-4 py-2 border-2 border-gray-400 rounded-md" />
				</div>
				<button className="p-2 m-8 text-white bg-teal-600 rounded-md" onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default CreateBook;
