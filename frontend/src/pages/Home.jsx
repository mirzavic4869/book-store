import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import Spinner from "../components/Spinner";
const Home = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		axios
			.get("http://localhost:3001/books")
			.then((response) => {
				setBooks(response.data.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	return (
		<div className="p-4">
			<div className="flex items-center justify-between">
				<h1 className="my-8 text-3xl font-bold">Book Lists</h1>
				<Link to={"/books/create"}>
					<MdOutlineAddBox className="text-4xl text-sky-800" />
				</Link>
			</div>
			{loading ? (
				<Spinner />
			) : (
				<table className="w-full text-sm text-center border-separate border-spacing-4">
					<thead>
						<tr>
							<th className="">No</th>
							<th className="">Title</th>
							<th className="max-md:hidden">Author</th>
							<th className="max-md:hidden">Publish Year</th>
							<th className="">Operations</th>
						</tr>
					</thead>
					<tbody>
						{books.map((item, index) => (
							<tr key={item._id} className="h-8 bg-white">
								<td className="rounded-md shadow-lg">{index + 1}</td>
								<td className="rounded-md shadow-lg">{item.title}</td>
								<td className="rounded-md shadow-lg max-md:hidden">{item.author}</td>
								<td className="rounded-md shadow-lg max-md:hidden">{item.publishYear}</td>
								<td className="rounded-md shadow-lg">
									<div className="flex items-center justify-center gap-x-4">
										<Link to={`/books/detail/${item._id}`}>
											<BsInfoCircle className="text-[#6ba91dff] md:text-2xl" />
										</Link>
										<Link to={`/books/edit/${item._id}`}>
											<AiOutlineEdit className="text-yellow-600 md:text-2xl" />
										</Link>
										<Link to={`/books/delete/${item._id}`}>
											<MdOutlineDelete className="text-red-600 md:text-2xl" />
										</Link>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Home;
