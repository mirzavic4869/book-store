import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateBook from "./pages/CreateBook.jsx";
import EditBook from "./pages/EditBook.jsx";
import ShowBook from "./pages/ShowBook.jsx";
import DeleteBook from "./pages/DeleteBook.jsx";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/books/create" element={<CreateBook />} />
			<Route path="/books/edit/:id" element={<EditBook />} />
			<Route path="/books/detail/:id" element={<ShowBook />} />
			<Route path="/books/delete/:id" element={<DeleteBook />} />
		</Routes>
	);
};

export default App;
