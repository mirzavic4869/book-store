import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditBook = () => {
	const [state, setState] = useState({ title: "", author: "", publishYear: "" });
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://localhost:3001/book/${id}`)
			.then((response) => {
				setLoading(false);
				setState(response.data);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [id]);
	const handleEdit = (e) => {
		e.preventDefault();
		const data = {
			title: state.title,
			author: state.author,
			publishYear: state.publishYear,
		};
		setLoading(true);
		axios
			.put(`http://localhost:3001/book/${id}`, data)
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
			<h1 className="my-4 text-3xl">EditBook</h1>
			{loading ? <Spinner /> : ""}
			<div className="flex flex-col p-4 mx-auto rounded-xl border-2 border-sky-400 w-[600px]">
				<div className="my-4">
					<label htmlFor="title" className="mr-4 text-xl text-gray-400">
						Title
					</label>
					<input type="text" id="title" value={state.title} onChange={(e) => setState({ ...state, title: e.target.value })} className="w-full px-4 py-2 border-2 border-gray-400 rounded-md" />
				</div>
				<div className="my-4">
					<label htmlFor="author" className="mr-4 text-xl text-gray-400">
						Author
					</label>
					<input type="text" id="author" value={state.author} onChange={(e) => setState({ ...state, author: e.target.value })} className="w-full px-4 py-2 border-2 border-gray-400 rounded-md" />
				</div>
				<div className="my-4">
					<label htmlFor="publishYear" className="mr-4 text-xl text-gray-400">
						Publish Year
					</label>
					<input type="text" id="publishYear" value={state.publishYear} onChange={(e) => setState({ ...state, publishYear: e.target.value })} className="w-full px-4 py-2 border-2 border-gray-400 rounded-md" />
				</div>
				<button className="p-2 m-8 rounded-md bg-sky-600" onClick={handleEdit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default EditBook;
